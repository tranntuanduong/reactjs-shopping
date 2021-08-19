// import './App.css';
import { useSnackbar } from 'notistack';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import NotFound from './components/NotFound';
import AlbumFeature from './features/Album';
import HomeFeature from './features/Home';
import TodoFeature from './features/Todo';

function App() {
    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         const params = {
    //             _limit: 10,
    //         };
    //         const productList = await productApi.getAll(params);
    //         console.log(productList);
    //     };

    //     fetchProducts();
    // }, []);

    return (
        <div className="App">
            <Header></Header>
            <Switch>
                <Route path="/" component={HomeFeature} exact></Route>
                <Route path="/todos" component={TodoFeature}></Route>
                <Route path="/albums" component={AlbumFeature} exact></Route>

                <Route component={NotFound}></Route>
            </Switch>
        </div>
    );
}

export default App;
