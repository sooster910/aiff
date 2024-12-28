import {RelayEnvironmentProvider} from "react-relay";

// interface RelayProviderProps {
//     environment: any; // 실제 환경에 맞는 타입으로 변경하세요
//     children: any;
// }

const  RelayProvider=({ environment, children }) =>{
    return (
        // @ts-ignore
        <RelayEnvironmentProvider environment={environment} >
            {children}
        </RelayEnvironmentProvider>
    );
}

export  default  RelayProvider