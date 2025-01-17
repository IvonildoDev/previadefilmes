import { useEffect, useState } from "react";
import api from '../../services/api';
import { Link } from 'react-router-dom';
import './home.css';

function Home() {

    const [filmes, setFilmes] = useState([]);
    const [loading, setloading] = useState(true);

    useEffect(() => {

        async function loadFilmes() {
            const response = await api.get("movie/now_playing", {
                params: {
                    api_key: "f934b66684ff20e05ef0d8d41ca6b21d",
                    language: "pt-BR",
                    page: 1,
                }
            })

            //console.log(response.data.results.slice(0, 10));
            setFilmes(response.data.results.slice(0, 10))
            setloading(false);

        }
        loadFilmes();
    }, [])

    if (loading) {
        return (
            <div className="loading">
                <h2>Carregando filmes ...</h2>
            </div>
        )
    }

    return (
        <div>
            <div className="container">
                <div className="lista-filmes">
                    {filmes.map((filme) => {


                        return (
                            <article key={filme.id}>
                                <strong>{filme.title}</strong>
                                <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
                                <Link to={`/filme/${filme.id}`}>Acessar</Link>
                            </article>
                        )
                    })}

                </div>
            </div>
        </div>
    )
}
export default Home;
