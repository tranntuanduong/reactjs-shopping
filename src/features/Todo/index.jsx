import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import NotFound from '../../components/NotFound';
import TodoDetailPage from './pages/DetailPage';
import ListPage from './pages/ListPage';

TodoFeature.propTypes = {};

function TodoFeature() {
    const match = useRouteMatch();
    return (
        // Nested routing
        <div>
            <Switch>
                <Route path={match.path} component={ListPage} exact></Route>
                <Route
                    path={`${match.path}/:todoId`}
                    component={TodoDetailPage}
                    exact
                ></Route>
                <Route component={NotFound}></Route>
            </Switch>
        </div>
    );
}

export default TodoFeature;
