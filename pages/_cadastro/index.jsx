
import React, { useState } from 'react';
import Head from 'next/head';
import { makeStyles } from '@material-ui/core/styles';


import {
    Paper,
    Grid,
    TextField,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Button
} from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';

import {RecipeService} from '../../services/RecipeService';

const useStyles = makeStyles((theme) => ({
    root: {
      //flexGrow: 1,
    },
    paper: {
      margin: '24px auto',
      maxWidth: '800px',
      padding: '12px'
    },
    img: {
        width: 250
    }
  }));

export default function Cadastro(){

    // Contantes
    
    const [name, setName] = useState('');
    const [imagem, setImagem] = useState('');
    const [category, setCategory] = useState('');
    const [servings, setServings] = useState('');
    const [time, setTime] = useState('');
    const [newIngredient, setNewIngredient] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [newDirection, setNewDirection] = useState('');
    const [directions, setDirections] = useState([]);

    const classes = useStyles();

    // Funções


    function resetForm(){
        setName(''),
        setImagem(''),
        setCategory('');
        setServings('');
        setTime('');
        setNewIngredient('');
        setIngredients([]);
        setNewDirection('');
        setDirections([]);
    }

    async function addRecipe(){

        const fieldLength = [
            name,
            imagem,
            category,
            servings,
            time,
            ingredients,
            directions,
        ].map(item => item.length);

       const newRecipe = await RecipeService.create({
            name,
            imagem,
            category,
            servings,
            time,
            ingredients,
            directions
        })

        resetForm();
    }

    function addIngredient(){
        if(newIngredient && ingredients.indexOf(newIngredient) === -1){
            setIngredients([...ingredients, newIngredient]);
            setNewIngredient('');
        }
    }

    function removeIngredient(ingredientToRemove){
        setIngredients(ingredients.filter(ingredient => ingredient !== ingredientToRemove))
    }

    function addDirection(){
        if(newDirection && directions.indexOf(newDirection) === -1){
            setDirections([...directions, newDirection]);
            setNewDirection('');
        }
    }

    function removeDirection(directionToRemove){
        setDirections(directions.filter(direction => direction !== directionToRemove))
    }

    return (
        <div>
            <Head>
                <title>Cadastro de Receitas</title>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
            </Head>
            <h1>Cadastro de Receitas</h1>
            <Paper className={classes.paper}>
                <Grid item container justify={'center'} spacing={2} sm={12}>
                    <Grid item>
                        <img src={imagem} className={classes.img} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Nome" value={name} onChange={event => setName(event.target.value)} fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Imagem" value={imagem} onChange={event => setImagem(event.target.value)} fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Categoria" value={category} onChange={event => setCategory(event.target.value)}  fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label="Rendimento" value={servings} onChange={event => setServings(event.target.value)}  fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField label="Tempo de Preparo" value={time} onChange={event => setTime(event.target.value)}  fullWidth />
                    </Grid>
                    <Grid item xs={12} container spacing={2}>
                        <Grid item xs={12}>
                            <h2>Ingredientes</h2>
                        </Grid>
                        <Grid item xs={12} container>
                            <List>
                                {ingredients.map(ingredient => (
                                    <ListItem key={ingredient}>
                                        <ListItemText>{ingredient}</ListItemText>
                                        <ListItemSecondaryAction>
                                            <IconButton edge="end" title="Remover Item" aria-label="delete" color={'secondary'} onClick={() => removeIngredient(ingredient)}>
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))}
                            </List>
                        </Grid>
                        <Grid item xs={12} container spacing={2}>
                            <Grid item xs={10}>
                                <TextField label="Novo Ingrediente" value={newIngredient} onChange={event => setNewIngredient(event.target.value)} />
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" color="primary" onClick={addIngredient}>Adicionar Ingrediente</Button>
                            </Grid>         
                        </Grid>
                    </Grid>

                    <Grid item xs={12} container spacing={2}>
                        <Grid item xs={12}>
                            <h2>Modo de preparo</h2>
                        </Grid>
                        <Grid item xs={12} container>
                            <List>
                                {directions.map(direction => (
                                    <ListItem key={direction}>
                                        <ListItemText>{direction}</ListItemText>
                                        <ListItemSecondaryAction>
                                            <IconButton edge="end" title="Remover Item" aria-label="delete" color={'secondary'} onClick={() => removeDirection(direction)}>
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))}
                            </List>
                        </Grid>
                        <Grid item xs={12} container spacing={2}>
                            <Grid item xs={10}>
                                <TextField label="Nova Instrução" value={newDirection} onChange={event => setNewDirection(event.target.value)} />
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" color="primary" onClick={addDirection}>Adicionar instrução</Button>
                            </Grid>         
                        </Grid>
                    </Grid>
                    <Grid item xs={12} container justify={'center'} spacing={2}>
                        <Grid item>
                            <Button onClick={resetForm} >Resetar Cadastro</Button>
                        </Grid>
                        <Grid item>
                            <Button onClick={addRecipe}>Cadastrar</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}