export interface EcapTokenDecoder {
    tenant_id: string;
    site_id: string;
    user_id: string;
    email: string;
    origin: string;
    display_name: string;
    role: string[];
}