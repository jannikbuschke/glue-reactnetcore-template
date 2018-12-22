import * as React from 'react';
import './App.css';
import { Formik } from 'formik';
import { StringEditor } from '@jannikb/react-glue';

class App extends React.Component {
  public render() {
    return (
      <div>
        <Formik
          initialValues={{ firstName: 'petr' }}
          onSubmit={() => {}}
          render={() => (
            <div>
              <StringEditor name="firstName" />
            </div>
          )}
        />
      </div>
    );
  }
}

export default App;
