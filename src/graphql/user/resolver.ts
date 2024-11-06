import UserService, { createUserpayload, loginpayload } from "../../serviece/user.service";

export const resolvers = {
    Query: {
      hello: () => 'Hi, how are you?',
      say: (_: any, { name }: { name: string }) => `Hello ${name}, how can I help you?`,
      getUserToken: async(_:any, payload:loginpayload)=>{
        const token = await UserService.loginUser(payload)
        return token
      },
      getUserLoggedin: async (_: any, parameter: any, context: any) => {
        console.log("Context in getUserLoggedin:", context);
      
        console.log("Context in getContext:", context);
        if (context && context.user){
          const id = context.user.id
          const user = await UserService.getUserbyid(id)
          return user
        }
        throw new Error("User is not authenticated");
      },
      
      
    },
    Mutation: {
      createUser: async (_: any, payload:createUserpayload) => { 
        const user = await UserService.createUser(payload)
        return user.id
      }
    }  
};
  

