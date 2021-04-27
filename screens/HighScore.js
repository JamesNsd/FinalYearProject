  import React from 'react';
import firebase from '../Firebase';
import Leaderboard from 'react-native-leaderboard';
import { Alert, View,Text, Image, Button, TouchableOpacity} from 'react-native';


const ordinal_suffix_of = (i) => {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}
export default class HighScore extends React.Component { //App
  constructor(){
    super();
  }
  state = {
    data: [] ,
    userRank: 1,


}
alert = (title, body) => {
  Alert.alert(title, body, [{ text: "OK", onPress: () => {} }], {
    cancelable: false
  });
};
sort = (data) => {
  //console.log("DATAAAAAAAA",data)
  const sorted = data && data.sort((item1, item2) => {
      return item2.highScore - item1.highScore;
  })
  let userRank = sorted.findIndex((item) => {
      return item.userName === this.state.myUserName;
  })
  this.setState({ userRank: ++userRank });
  return sorted;
}
componentDidMount(){
try {
  const user = firebase.auth().currentUser;
firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid)
.get()
.then(querySnapshot => {
this.setState({
  myUserName:querySnapshot.data().name,
  myLastScore:querySnapshot.data().score
})
});
  firebase.firestore()
  .collection('users')
  .get()
  .then(snapshot => {
    snapshot.forEach(doc => {
      if (doc && doc.exists) {
        this.setState({

          data:[
            ...this.state.data,
            {
          userName:doc.data().name,
          highScore:doc.data().score}
          ]

        })

      }
    });
    this.sort(this.state.data)

  });
} catch (error) {

}

}

renderHeader() {
  return (
      <View colors={[ '#1da2c6', '#1695b7']}
          style={{ backgroundColor: 'white'}}>

            <View style={{
              flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop:6,}}>
              <Text style={{
              fontSize: 60, fontStyle: 'italic',
              fontWeight:"bold",
              color:"#fb5b5a",
              marginBottom:6}}>
                  Leaderboard</Text>
              <Text style={{ fontSize: 25, fontWeight:"bold", color: 'black', }}>{this.state.myUserName}</Text>


            </View>

          <View style={{
              flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
              marginBottom: 15, marginTop: 15
          }}>
            <View style={{flex:3, justifyContent:'space-around',alignItems:'center',flexDirection:'row'}}>
              <Text style={{ color: 'black', fontSize: 25,}}>
                  {ordinal_suffix_of(this.state.userRank)}
              </Text>

              <Text style={{ color: 'black', fontSize: 25,}}>
                  {this.state.myLastScore} points
              </Text>

            </View>

          </View>

      </View>
  )
}



  render(){
    return (

<View style={{ flex: 1 }}>
        {/* Ghetto Header */}

      {this.renderHeader()}
        <Leaderboard
        /*onRowPress={(item, index) => {
          this.alert(item.name + " clicked", item.score + " points, wow!")}}*/
        data={this.state.data}
        sortBy='highScore'
        evenRowColor= "#edfcf9"
        labelBy='userName'/>

        </View>


        )
  }
}