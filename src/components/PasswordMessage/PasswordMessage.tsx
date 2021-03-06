import React, { Component } from 'react'
import {
    Message,
    Icon,
    Button,
    Segment,
    Popup,
    Input
  } from 'semantic-ui-react'

interface PasswordMessageProps {
  copyToClipboard?: boolean
  password?: any
  parent?: any
}
  
interface PasswordMessageState {
  passwordHidden?: boolean
  copied?: boolean
}
  

export default class PasswordMessage extends Component<PasswordMessageProps, PasswordMessageState> {

    state = {
      copied: false,
      passwordHidden: this.props.password.hidePassword ? true : false
    }

    passwordInput;
    timeout;
    constructor(props) {
      super(props);

      this.passwordInput = React.createRef();

      // This binding is necessary to make `this` work in the callback
      this.handleCopy = this.handleCopy.bind(this);
      this.togglePassword = this.togglePassword.bind(this);

      if(this.props.copyToClipboard) {
        this.handleCopy();
      }
    }

    handleCopy() {
      this.passwordInput.current.select();
      document.execCommand('copy');

      this.setState({ 
        copied: true
      })

      this.timeout = setTimeout(() => {
        this.setState({ 
          copied: false
        })
      }, 1500)
    }

    togglePassword() {

      this.setState(prevState => ({
        passwordHidden: !prevState.passwordHidden
      }));

    }

    render() {
      return (
        <div>
            <Message
                onDismiss={(e)=>{
                    e.stopPropagation();
                    e.preventDefault();
                    this.props.parent.handleDismiss(this.props.password.id);
                }}
                icon
                attached="top"
                key={this.props.password.id}
                className="PasswordMessage"
            >
                <Icon name='user secret' />
                <Message.Content>
                    <Message.Header>Your password is:</Message.Header>
                    <Input className="PasswordOutput" readOnly value={this.props.password.password} ref={this.passwordInput} type={this.state.passwordHidden ? 'password' : 'text'}/>
                    <Popup content={this.state.passwordHidden ? 'Show Password' : 'Hide Password'} trigger={<Button inline size="medium" icon={this.state.passwordHidden ? 'eye' : 'eye slash'} onClick={this.togglePassword} />} />
                    <Popup content="Copied!" open={this.state.copied} trigger={<Button inline size="medium" icon="copy" onClick={this.handleCopy} disabled={this.state.passwordHidden ? true : false}/>} />
                </Message.Content>
            </Message>
            <Segment attached="bottom" size="mini">
                <b>Generated at:</b> {this.props.password.generated}<br />
                <b>Settings: </b>
            </Segment>
        </div>
      )
    }
  }