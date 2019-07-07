import React from 'react'
import { Segment,Image,Item,Header,Button } from "semantic-ui-react";
const imageStyle = {
    filter: 'brightness(70%)'
    // background:'white'
};

const imageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto'
    
    // color: 'white'
};
const WorkOrderDetailedHeader = () => {
    return (
      <Segment.Group>
         <Segment basic attached="top" style={{ padding: '0'}}>
           <Image  src="/assets/categoryImages/RollerIcon.svg"  size='small' fluid style={imageStyle} centered />
   
           <Segment basic style={imageTextStyle} >
             <Item.Group>
               <Item>
                 <Item.Content>
                   <Header
                     size="huge"
                     content="Job Title"
                    //  style={{ color: 'Blue' }}
                   />
                   <p>job start Date</p>
                   <p>
                     Ordered by <strong>ordered by</strong>
                   </p>
                 </Item.Content>
               </Item>
             </Item.Group>
           </Segment>
         </Segment>
   
         <Segment attached="bottom">
           <Button>Cancel My Offer</Button>
           <Button color="teal">Put An Offer</Button>
   
           <Button color="orange" floated="right">
             Manage Offer
           </Button>
         </Segment>
       </Segment.Group>
    )
}

export default WorkOrderDetailedHeader
