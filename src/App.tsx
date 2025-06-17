import { useEffect, useState } from 'react'
import './App.css'
import Search from './components/Search'
import type { Movies, Result } from './types'
import Spinner from './components/Spinner'
import MovieCard from './components/MovieCard'
import { useDebounce } from 'react-use'
import { getTrendingMovies, updateSearchCount, type TrendingMovie } from './appwrite'

const API_BASE_URL = "https://api.themoviedb.org/3"

const API_KEY = import.meta.env.VITE_TMDB_API_KEY

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [movies, setMovies] = useState<Result[]>([])
  const [loading, setLoading] = useState(true)
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const [trendingMovies, setTrendingMovies] = useState<TrendingMovie[]>([])

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 1000, [searchTerm])

  const fetchMovies = async (query: string = '') => {
    const url = query ? 
      `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&sort_by=popularity.desc` 
      : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`

    setLoading(true)
    setErrorMessage("")
    try {
      const response = await fetch(url, API_OPTIONS)
      if (!response.ok) {
        setErrorMessage(`Failed to fetch movies: ${response.statusText}`)
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data: Movies = await response.json()
      setMovies(data.results)

      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0])
      }
    } catch (error) {
      console.error("Failed to fetch movies:", error)
      setErrorMessage("Failed to fetch movies. Please try again later.")
      return []
    } finally {
      setLoading(false)
    }
  }

  const loadTrendingMovies = async () => {
    try {
      const data = await getTrendingMovies()
      setTrendingMovies(data)
    } catch (error) {
      console.error("Failed to fetch trending movies:", error)
    }
  }

  useEffect(() => {
    fetchMovies(debouncedSearchTerm)
  }, [debouncedSearchTerm])

  useEffect(() => {
    loadTrendingMovies()
  }, [])

  return (
    <main>
      <div className="pattern"/>
      
      <div className="wrapper">
        <header>
          <h1>Find <span className="text-gradient">Movies</span> You Will Enjoy With Ease!</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        { trendingMovies.length > 0 && (
            <section className="trending">
              <h2>Trending Movies</h2>
              <ul>
                {trendingMovies.map((movie, index) => (
                  <li key={movie.movieId} className="trending-movie">
                    <p>{ index + 1 }</p>
                    <img 
                      src={movie.moviePoster || '/No-Poster.png'} 
                      alt={movie.searchTerm} 
                    />
                  </li>
                ))}
              </ul>
            </section>
        )}

        <section className="all-movies">
          <h2>All Movies</h2>

          {loading && <Spinner />}
          {!loading && movies.length === 0 && <p>No movies found.</p>}
          {!loading && movies.length > 0 && (
            <ul className="movies-list">
              {movies.map(movie => (
                <MovieCard 
                  movie={movie}
                  key={movie.id}
                />
              ))}
            </ul>
          )} 

          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </section>
      </div>
    </main>
  )
}

export default App
