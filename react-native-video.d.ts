declare module 'react-native-video' {
    import { Component } from 'react';
    import { ViewProps } from 'react-native';

    interface VideoProps extends ViewProps {
        source: { uri: string } | number;
        resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
        paused?: boolean;
        onBuffer?: () => void;
        onError?: () => void;
        style?: any;
    }

    export default class Video extends Component<VideoProps> {}
}
