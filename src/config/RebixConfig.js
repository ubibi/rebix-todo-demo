import Rebix from 'react-rebix';
import TodoActions from '../actions/TodoActions';
import TodoStore from '../stores/TodoStore';

export default Rebix.createConfigure({

    initialState: null,

    actions: {
        todo: TodoActions
    },

    stores: {
        todo: TodoStore
    }

});