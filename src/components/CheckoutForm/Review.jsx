import React from 'react'
import { Typography, List, ListItem, ListItemText } from '@material-ui/core'
import Product from '../Products/Product/Product'

const Review = ({ checkoutToken }) => {
    return (
        <>
        <Typography variant="h6" gutterBottom> Ordre liste</Typography>
        <List disablePadding>
            {checkoutToken.live.line_items.map((product) => (
                <ListItem style={{padding: '10px 0'}} key={product.name}>
                    <ListItemText primary={product.name} secondary={`Antal: ${product.quantity}`}/>
                    <Typography variant="body2">{product.line_total.formatted_with_code}</Typography>

                </ListItem>
            ))}
            <ListItem style={{padding: '10px 0'}}></ListItem>
            <ListItemText primary="total" />
            <Typography variant="subtitle1" style={{ fontWeight: 700}}>
                {checkoutToken.live.subtotal.formatted_with_code}
            </Typography>
        </List>
        </>
    )
}

export default Review
