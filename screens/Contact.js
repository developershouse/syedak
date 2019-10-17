import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  AsyncStorage,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  StatusBar
} from "react-native";
import {
  Textarea,
  Container,
  Header,
  Content,
  Button,
  Item,
  Toast,
  Input,
  Icon,
  Body,
  Left,
  Spinner
} from "native-base";
import * as Facebook from "expo-facebook";
import OffLine from "../components/OfflineNotice";
import axios from "axios";
//utils
import Colors from "../constants/colors";
import { validateLoginData } from "../Helpers/validators";
//redux
import { connect } from "react-redux";


export default class Contact extends Component {
  static navigationOptions = {
		header: null
	};
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      name: '',
      message: '',
      item: '',
      password: "",
      errors: {},
      loading: false
    };
  }

  
  // handleLogin = () => {
  //   const data = {
  //     email: this.state.email,
  //     password: this.state.password
  //   };

  //   const { valid, errors } = validateLoginData(data);

  //   if (valid) {
  //     this.setState({ loading: true });
  //     axios
  //       .post('https://app.shoppingrunway.mx/api/v1/login', data)
  //       .then(async res => {
  //         const credentials = {
  //           ...res.data.customer,
  //           token: res.data.token
  //         };
  //         await AsyncStorage.setItem("authUser", JSON.stringify(credentials));
  //         Toast.show({
  //           text: "Loggin success",
  //           duration: 2500,
  //           position: "top",
  //           style: {
  //             backgroundColor: "#c8e6c9"
  //           },
  //           textStyle: { color: "#1b5e20" }
  //         });
  //         this.setState({ loading: false });
  //         this.props.toggleAuth();
  //         this.props.navigation.navigate("Home");
  //       })
  //       .catch(e => {
  //         this.setState({loading:false});
  //         alert('Correo o constraseña incorrecta');
  //         console.log("ERROR", e);
  //        // console.error(e);
  //       });
  //   } else {
  //     this.setState({ errors });
  //   }
  // };

  render() {
    const { errors, loading } = this.state;
    return (
      <Container>
        <Header style={styles.header}>
          <Left>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Icon
                style={styles.white}
                name={Platform.OS === "ios" ? "ios-close" : "md-close"}
              />
            </TouchableOpacity>
          </Left>
          <Body>
            <Text style={[styles.white, { fontSize: 20 }]}>Contact Form</Text>
          </Body>
        </Header>
        <OffLine />
        <Content style={{ paddingHorizontal: 18, paddingTop: 50 }}>
          {/*<Button onPress={this.handleLoginWithFB} style={styles.fbBtn}>
            <Icon name="logo-facebook" />
            <Text style={[styles.white, { fontSize: 18, marginRight: 8 }]}>
              Ingresar con Facebook
            </Text>
          </Button>*/}
          <KeyboardAvoidingView behavior="padding" enabled>
            <View style={{ marginVertical: 20 }}>
              <Item error={errors.name ? true : false}>
                <Icon name={Platform.OS === "ios" ? "ios-person" : "md-person"} />
                <Input
                  secureTextEntry
                  placeholder="Name"
                  onChangeText={name => this.setState({ name })}
                />
                {errors.name && (
                  <Icon
                    style={{ color: "red" }}
                    name={
                      Platform.OS === "ios"
                        ? "ios-close-circle"
                        : "md-close-circle"
                    }
                  />
                )}
              </Item>
              {errors.name && (
                <Text style={styles.error}>{errors.name}</Text>
              )}
              <Item error={errors.email ? true : false} style={styles.Input}>
                <Icon name={Platform.OS === "ios" ? "ios-mail" : "md-mail"} />
                <Input
                  placeholder="Email Adress"
                  onChangeText={email => this.setState({ email })}
                />
                {errors.email && (
                  <Icon
                    style={{ color: "red" }}
                    name={
                      Platform.OS === "ios"
                        ? "ios-close-circle"
                        : "md-close-circle"
                    }
                  />
                )}
              </Item>
              {errors.email && <Text style={styles.error}>{errors.email}</Text>}
              <Item error={errors.Item ? true : false} style={styles.Input}>
                <Icon name={Platform.OS === "ios" ? "ios-pricetag" : "md-pricetag"} />
                <Input
                  placeholder="Item"
                  onChangeText={item => this.setState({ item })}
                />
                {errors.email && (
                  <Icon
                    style={{ color: "red" }}
                    name={
                      Platform.OS === "ios"
                        ? "ios-close-circle"
                        : "md-close-circle"
                    }
                  />
                )}
              </Item>
              {errors.item && <Text style={styles.error}>{errors.item}</Text>}
              
              <Item error={errors.message ? true : false} style={[styles.Input,{alignItems:'flex-start'}]}>
                <Icon name={Platform.OS === "ios" ? "ios-text" : "md-text"} />
                <Textarea 
                  rowSpan={5}
                  style={{fontSize:18}}
                  placeholder="Message"
                  onChangeText={message => this.setState({ message })}
                />
                {errors.message && (
                  <Icon
                    style={{ color: "red" }}
                    name={
                      Platform.OS === "ios"
                        ? "ios-close-circle"
                        : "md-close-circle"
                    }
                  />
                )}
              </Item>
              {errors.message && <Text style={styles.error}>{errors.message}</Text>}
              
              <Button onPress={this.handleContact} style={styles.submitBtn}>
                {loading && <Spinner color="#fff" size={0} />}
                <Text style={styles.white}>Submit</Text>
              </Button>
              
              
            </View>
          </KeyboardAvoidingView>
        </Content>
      </Container>
    );
  }
}

// const mapDispatchToProps = {
//   toggleAuth
// };

// export default connect(
//   null,
//   mapDispatchToProps
// )(Login);

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.primary.main,
    justifyContent: "space-between",
    ...Platform.select({
      android: {
        marginTop: StatusBar.currentHeight
      }
    })
  },
  white: {
    color: Colors.primary.light
  },
  textLogo: {
    fontSize: 18,
    color: Colors.primary.light
  },
  Input: {
    marginTop: 18
  },
  submitBtn: {
    backgroundColor: Colors.secondary.main,
    padding: 6,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    alignSelf: "center",
    borderRadius: 8,
    marginVertical: 20
  },
  fbBtn: {
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: "95%",
    borderRadius: 8
  },
  error: {
    color: "red",
    marginBottom: 12
  }
});
