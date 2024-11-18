import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function About() {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [overview, setOverview] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [voteAverage, setVoteAverage] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovieData = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=603cdf52aeb9055dd42be4d11937760a&language=en-US`);
                setTitle(response.data.title);
                setOverview(response.data.overview);
                setReleaseDate(response.data.release_date);
                setVoteAverage(response.data.vote_average);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching movie data:", error);
                setLoading(false);
            }
        };

        if (id) {
            fetchMovieData();
        }
    }, [id]);

    return (
        <div>
            {loading ? (
                <p>Loading movie data...</p>
            ) : (
                <>
                    <h1>{title}</h1>
                    <p>{overview}</p>
                    <p>Release Date: {releaseDate}</p>
                    <p>Average Rating: {voteAverage}</p>
                </>
            )}
        </div>
    );
}

