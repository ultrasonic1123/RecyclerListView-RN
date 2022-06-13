
import React, {Component}  from 'react'
import {View, Text, Dimensions, StyleSheet} from 'react-native'
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview'
export default class RecyclerListViewContainer extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            dataProvider: new DataProvider((r1, r2) => r1 !== r2),
            data : [{
                item:"item no 0",
                type:""
            },
            {
                item:"item no 1",
                type:""
            }],
        }
    }

    layoutProvider = new LayoutProvider(
        (index) => {
            console.log("index",index)
            return index %3  ==0 ?  "FULL" : "HAFT"
        }
        ,
        (type, dim) => {
            console.log("type", type)
            switch(type){
                case "FULL":
                    dim.width  = Dimensions.get('window').width;
                    dim.height = Dimensions.get('window').height/10;
                    break;
                case "HAFT":
                    dim.width  = Dimensions.get('window').width/2 - 1;
                    dim.height = Dimensions.get('window').height/10;
                    break;
                default:
                    dim.width  = 0;
                    dim.height = 0;
            }
            
    })

    addNewData(quantity){
        let additionData = []
        for(let i = this.state.data.length ; i < this.state.data.length+quantity; i++){
            additionData.push({item: `item: no ${i}`, type :"FULL"})
        }
        return additionData
    }

    rowRenderer(type, data){
        console.log("row render", data.item)
        return <View style={{flex:1, backgroundColor:"chocolate", borderBottomColor:"grey", borderWidth:1, alignItems:'center', justifyContent:'center'}}>
            <Text >{data.item}</Text>
        </View>
    }

    componentDidMount(){
        if(this.state.count === 3) return
        this.setState({
            dataProvider: this.state.dataProvider.cloneWithRows([...this.state.data,...this.addNewData(20)])
            ,data: [...this.state.data,...this.addNewData(20)],
        })
        console.log()
        
    }
    handleListEnd = () => {
        console.log("This function is handle list end")
        this.setState({ 
            dataProvider: this.state.dataProvider.cloneWithRows([...this.state.data,...this.addNewData(20)])
            ,data: [...this.state.data,...this.addNewData(20)],
        })
        // this.setState({});
    }

    render(){
        return <View style={{flex:1}}>
            <Text>RecyclerListView:</Text>
                <RecyclerListView 
                    style={{ flex: 1 }}
                    dataProvider={this.state.dataProvider}
                    layoutProvider = {this.layoutProvider}
                    rowRenderer={this.rowRenderer}
                    onEndReached={this.handleListEnd}
                    onEndReachedThreshold={0.2}
                />
        </View>
        

    }
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'stretch',
        justifyContent: 'space-between',
    },
})