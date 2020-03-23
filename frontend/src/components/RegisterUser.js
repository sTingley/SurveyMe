import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';

import { TextField, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardAction from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper'


export default function RegisterUser(props) {
    const history = useHistory();


    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const [username, setUsername] = useState('')
    
    const handleChange = (e) => {
        if (e.target.id === 'password1')
            setPassword1(e.target.value);
        if (e.target.id === 'username')
            setUsername(e.target.value);
        if (e.target.id ==='password2')
            setPassword2(e.target.value);
    }

    const registerNewUser = () => {
        if(password1 === password2 && password1.length > 5 && password2.length > 5 && username.length > 5)
        {
            console.log(`creating username password with this info... username: ${username} password: ${password1}`)
            attemptRegister(username, password1)  
        }
        else
            console.log('Error check info try again')
    }


    const attemptRegister = (username, password) => {
        fetch('http://localhost:5000/api/v1/addUser', {
          method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })  
            .then((data) => {
                if(data.status === 401){
                    console.log('error did not create user')
                }
                else if(data.status === 200){
                    console.log('authorized')
                    //using local storage to store userdata (not private)
                    console.log('user created navigating to login...')
                    history.push('/Login')
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }

    const textFieldStyles={
        width: '30%'
    }

    return (
        <Paper style={{ width: '85%' }}>
            <Card>
                <Typography variant='h4'>
                    Register New User Screen
                </Typography>
                <CardContent style={{ width: '75%' }}>
                    <TextField
                        value={username}
                        key={'username'}
                        onChange={handleChange}
                        id={'username'}
                        label='enter desired username here'
                        variant='outlined'
                        style={textFieldStyles}
                    /><br></br>
                    <TextField
                        value={password1}
                        key={'password1'}
                        onChange={handleChange}
                        id={'password1'}
                        label='enter desired password here'
                        variant='outlined'
                        type='password'
                        style={textFieldStyles}

                    /><br></br>
                    <TextField
                        value={password2}
                        key={'password2'}
                        onChange={handleChange}
                        id={'password2'}
                        label='confirm desired password here'
                        variant='outlined'
                        type='password'
                        style={textFieldStyles}

                    />
                    <CardAction>
                        <Button onClick={registerNewUser}>Submit</Button>
                    </CardAction>

                </CardContent>
            </Card>
        </Paper>
        )
}