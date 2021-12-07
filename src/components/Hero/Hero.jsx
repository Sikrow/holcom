import React from 'react'
import { Grid, Typography } from '@material-ui/core';

import useStyles from './styles'
import HeroImg from '../../assets/holcom.png'

const Hero = () => {
    const classes = useStyles();
    return (
        <section>  
            <div className={classes.toolbar}/>
            <div className={classes.heroBackground}>
            
                <Grid container spacing={3}>
                    <Grid item lg={4}></Grid>
                    <Grid item lg={4} container justify="center" alignContent="center" className={classes.siteTitle}>
                        <Typography variant='h1'>Holcom.dk</Typography> 
                    </Grid>
                    <Grid item lg={4}></Grid>
                </Grid>
            
                </div>
        </section>
    )
}

export default Hero;
