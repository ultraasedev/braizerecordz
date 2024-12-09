export type ServiceCategory = {
    id: string
    name: string
    icon: any
    services: Service[]
  }
  
  export type Service = {
    id: string
    name: string
    description: string
    email: string
    phone: string
    contactName?: string
  }
  
  export type FormData = {
    name: string
    email: string
    phone: string
    subject: string
    message: string
    budget: string
    heardFrom: string
  }
  
  export type FormErrors = {
    [key: string]: string
  }
  
  export type SubmitStatus = "idle" | "success" | "error"