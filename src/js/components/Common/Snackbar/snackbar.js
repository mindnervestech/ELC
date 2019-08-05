import React, { Component } from 'react'
import { SnackbarProvider, wrapComponent } from 'react-snackbar-alert';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions/index';
export default class snackbar extends Component {
    render() {
        return (
            <SnackbarProvider position="bottom">
              <Container />
            </SnackbarProvider>
          );
    }
}

const Container = wrapComponent(function({ createSnackbar }) {
    function showSnackbar() {
      createSnackbar({
        message: 'Hello Snackbar!',
        dismissable: true,
        pauseOnHover: false,
        progressBar: false,
        sticky: false,
        theme: 'success',
        timeout: 3000
      });
    }
  
  });
