import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

interface Member {
    login: string;
    avatar_url: string;
}

const Main: React.FC = () => {
    const [members, setMembers] = useState<Member[]>([]);

    useEffect(() => {
        fetch('https://api.github.com/orgs/rocketseat/members').then(response => {
            response.json().then(data => {
                setMembers(data);
            })
        })
    }, [])

    return (
        <FlatList
          contentContainerStyle={{padding: 24}}  
          data={members}
          keyExtractor={member => member.login}
          renderItem={({ item: member }) => (
              <View style={styles.member}>
                <Image style={styles.image} source={{ uri: member.avatar_url }} />
                <Text>{member.login}</Text>
              </View>
            )}
        />
    );
}

const styles = StyleSheet.create({

    member: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    },

    image: {
        width: 44,
        height: 44,
        borderRadius: 22,
        marginRight: 11
    }
})

export default Main;