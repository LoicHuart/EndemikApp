import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input } from "react-native-elements"
import { Formik } from 'formik'
import * as Yup from 'yup';
import color from "../../constants/color"
import { AuthContext } from "../../context/AuthContext";

const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    id_manager: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
});

export const AddService = () => {
    const { token } = useContext(AuthContext);
    const sendAddServices = async (value) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(value);

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch(`http://${process.env.REACT_APP_API_HOST}/api/services`, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    };
    
    return (
        <View>
            <Text style={styles.title}>Ajout d'un service</Text>

            <Formik
                initialValues={{ 
                    name: '', 
                    id_manager: '',
                }}
                validationSchema={SignupSchema}
                onSubmit={values => {
                    sendAddServices(values)
                }}
            >
            {({ handleChange, handleBlur, handleSubmit, values, errors}) => (
                <View>
                <Input 
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    value={values.name}
                    placeholder='Nom'
                    errorMessage= {errors.name}
                />
                <Input 
                    onChangeText={handleChange('id_manager')}
                    onBlur={handleBlur('id_manager')}
                    value={values.id_manager}
                    placeholder='Manager'
                />
                
    

                <Button onPress={handleSubmit} title="Valider" buttonStyle={styles.button}/>
                </View>
            )}
            </Formik>
        </View>
    )
}

const styles = StyleSheet.create({
    title:{
        marginBottom: 30, 
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20
    },
    button:{
        backgroundColor: color.COLORS.SECONDARY,
        alignSelf: 'flex-start',
        alignSelf: 'center'
    }
})
