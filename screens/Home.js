import React, {Component} from 'react'
import {Text, View, Platform, StyleSheet, StatusBar, FlatList, Image, Modal, TouchableHighlight} from 'react-native'
import {Container, Header, Content, Left, Body, Right, Icon, Spinner, } from 'native-base'
//components
import OffLine from "../components/OfflineNotice"
import BrandImage from "../components/BrandImage"
//utils
import Colors from "../constants/colors"
//redux
import {connect} from 'react-redux'
import {getBrands} from "../redux/actions/brands"
import {cartInit} from "../redux/actions/cart"
import Badge from "../components/Badge";
import * as WebBrowser from 'expo-web-browser';

class HomeScreen extends Component {
	static navigationOptions = {
		header: null
	};
	constructor(props){
		super(props);
		this.state= {
			modalVisible: false,	
			adImage: '',
			adLink: ''
		}
	}
	setModalVisible(visible) {
		this.setState({modalVisible: visible});
	}
	async componentDidMount() {
		this.props.getBrands()
		this.props.cartInit()
		await fetch('https://jsonplaceholder.typicode.com/photos/20')
    	.then((response) => response.json())
    	.then((responseJson) => {
    	  this.setState({
			  modalVisible: true,
			  adImage: responseJson.url,
			  adLink: 'https://amazon.ca'
		  })
    	})
    	.catch((error) => {
    	  console.error(error);
  	  });


	}
	ad = () => {
		const url = this.state.adLink;
		this.setModalVisible(!this.state.modalVisible);
		return WebBrowser.openBrowserAsync(url)
	  };
	render() {
		return (
			
			<Container>
				    <Modal
						animationType="slide"
						transparent={true}
						visible={this.state.modalVisible}
						onRequestClose={() => {
							Alert.alert('Modal has been closed.');
						}}>
						<View style={{flex:1,marginTop: 22, alignItems:'center',justifyContent: 'center',flexDirection:'row'}}>
							<View style={{flex:1,justifyContent:'space-around'}}>
							<TouchableHighlight onPress={this.ad}>
								<Image source={{uri: this.state.adImage}} style={{height:'60%',resizeMode: 'stretch'}}/>
							</TouchableHighlight>
							<Icon
								onPress={() => {
									this.setModalVisible(!this.state.modalVisible);
									}}
								style={[styles.blackIcon,{position:'absolute',top:0,right:10,fontSize:34}]}
								name={Platform.OS === "ios" ? "ios-close" : "md-close"}
							/>
							</View>
						</View>
					</Modal>
				<Header style={styles.header}>
					<Left>
						<Icon
							style={[styles.whiteIcon, {fontSize: 35}]}
							name={Platform.OS === "ios" ? "ios-menu" : "md-menu"}
							onPress={() => {
								this.props.navigation.openDrawer()
							}}
						/>
					</Left>
					<Body>
					<View style={{alignItems: "center"}}>
						<Image source={require('../assets/logoHeader.png')} style={styles.image}/>
					</View>
					</Body>
					<Right>
						<View style={{flexDirection: "row"}}>
							<Icon
								onPress={() => this.props.navigation.navigate('Search')}
								style={styles.whiteIcon}
								name={Platform.OS === "ios" ? "ios-search" : "md-search"}
							/>
							<Icon
								onPress={() => {
									this.props.navigation.navigate("Cart")
								}}
								style={[styles.whiteIcon, {marginLeft: 18, marginRight: 12}]}
								name={Platform.OS === "ios" ? "ios-cart" : "md-cart"}
							/>
							<Badge style={{position: 'absolute', top: 0, right: 0}}>
								<Text style={{color:'#fff'}}>{this.props.cardNum}</Text>
							</Badge>
						</View>
					</Right>
				</Header>
				<OffLine/>
				<Content>
					{!this.props.brands.loading ? (
						<FlatList
							data={this.props.brands.brands}
							keyExtractor={(item) => item.id.toString()}
							renderItem={({item}) => (
								<BrandImage
									brand={item}
									navigation={this.props.navigation}
								/>
							)}
						/>
					) : (
						<Spinner color="#555" size={0}/>
					)}
				</Content>
			</Container>
		)
	}
}

const styles = StyleSheet.create({
	header: {
		backgroundColor: Colors.primary.main,
		...Platform.select({
			android: {
				marginTop: StatusBar.currentHeight
			}
		})
	},
	whiteIcon: {
		color: Colors.primary.light
	},
	textLogo: {
		fontSize: 18,
		color: "#fff"
	}, image: {
		height: 50,
		width: 100,
		resizeMode: 'contain'
	}
})


const mapStateToProps = (state) => ({
	brands: state.brands,
	cardNum: state.cart.cardNum

});

const mapDispatchToProps = {
	getBrands, cartInit
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
