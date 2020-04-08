import gql from 'graphql-tag' ;

const uploadMediaMutation = gql`
    mutation ($media: Upload!, $title: String!, $location: String!, $date: Date!) {
        uploadMedia(
            media: $media
            title: $title
            location: $location
            date: $date
        ) {
            id
            title
            url
            location
            date
            description
        }
    }
`