import axios from 'axios';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import UserContext from '../context/UserContext';
import Header from "./Header";
import Main from "./stylesAll/Main";
import CapaAlbum from './stylesAll/CapaAlbum';

function AlbunsPage() {

    const [albuns, setAlbuns] = useState([]);
    const { categoria } = useContext(UserContext);
    const filterCategories = albuns.filter(categorie => categorie.id === categoria);
    console.log(filterCategories);

    useEffect(() => {
        const promise = axios.get("https://projeto-loja-vinil.herokuapp.com/albuns");
        promise.then((response) => {
            const { data } = response;
            setAlbuns(data);
            console.log(data);
        })
        promise.catch(err => console.log(err.response));
    }, []);
    
   return filterCategories.length > 0 ? (
        <Main>
        <Header />
        <BodyAlbum>
            {
            filterCategories.map(vinil => {
                const { _id, banda, album, url, preco } = vinil;
                return  (
                   <CapaAlbum imagePath={url}>
                        <Link to={`/carrinho/${_id}`}>
                            <img src={url} alt={title} key={_id}/>
                            <p>{`${banda} - ${album}`}</p>
                        </Link>
                        <p>{`por: R$ ${preco}`}</p>
                  </CapaAlbum>
                   )
                })
            }
        </BodyAlbum>
        </Main>
    ) : (
        <Main>
            <span>Carregando a página</span>
        </Main>
    );
}

const BodyAlbum = styled.section`
    width: 100vw;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    `

export default AlbunsPage