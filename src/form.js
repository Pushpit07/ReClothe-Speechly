import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import ChildCareIcon from '@material-ui/icons/ChildCare';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        ReClothe
      </Link>{' '}
      {new Date().getFullYear()}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

const handleSubmit = async (e) => {
  e.preventDefault();
  window.location = "http://127.0.0.1:3000/appreciation";
}

export default function DonateForm(props) {
  const [state, setState] = useState({
       first_number_value: "",
       first_cloth_value: "",
       second_number_value: "",
       second_cloth_value: "",
    });

  const{ first_number_value, first_cloth_value, second_number_value, second_cloth_value } = state;

  const classes = useStyles();

  if(props.segment === undefined){
    console.log(1);
  }
  else{
    sleep(3000);
    const entity0 = props.segment.entities[0];
    const entity1 = props.segment.entities[1];
    const entity2 = props.segment.entities[2];
    const entity3 = props.segment.entities[3];

    console.log(props.segment)
      if (entity0 && entity0.value) {
        if (entity0.value !== first_number_value) {
          setState({...state, first_number_value: entity0.value});
        }
      }
      if (entity1 && entity1.value) {
        if (entity1.value !== first_cloth_value) {
          setState({...state, first_cloth_value: entity1.value});
        }
      }
      if (entity2 && entity2.value) {
        if (entity2.value !== second_number_value) {
          setState({...state, second_number_value: entity2.value});
        }
      }
      if (entity3 && entity3.value) {
        if (entity3.value !== second_cloth_value) {
          setState({...state, second_cloth_value: entity3.value});
        }
      }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <ChildCareIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Donate clothes
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="address"
                label="Address"
                type="text"
                id="address"
                autoComplete="current-address"
              />
            </Grid>  
              <Grid item xs={5}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="type"
                label="No. of items"
                value = {first_number_value}
                type="text"
                autoFocus
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={7}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="type"
                label="Type of cloth"
                value = {first_cloth_value}
                type="text"
                autoFocus
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                variant="outlined"
                fullWidth
                id="type"
                label="No. of items"
                value = {second_number_value}
                type="text"
                autoFocus
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={7}>
              <TextField
                variant="outlined"
                fullWidth
                id="type"
                label="Type of cloth"
                value = {second_cloth_value}
                type="text"
                autoFocus
                autoComplete="off"
              />
            </Grid>
            </Grid>
            
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Donate Now <ArrowRightIcon/>
          </Button>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}