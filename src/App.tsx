/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import 'antd/dist/antd.css';
import TodoContainer from './components/todo/TodoContainer';

function App() {
  //@TODO login
  // let isLogged = true;

  const RenderLayout = (
    <div>
      <TodoContainer />
    </div>
  );

  return RenderLayout;
  // return isLogged ? RenderLayout : <Spinner mask />;
}

export default App;
