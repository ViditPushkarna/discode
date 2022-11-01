import { View, Text, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { selectToken } from '../redux/authSlice'

export default function Home() {
    const token = useSelector(selectToken)
    return (
        <View style = {styles.page}>
            <Text style = {styles.text}>
                Hello this is home page when user is logged in
                token  = {token}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    page:{
        flex:1,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text:{
        color: 'white',
        fontSize: 20,

    }
})