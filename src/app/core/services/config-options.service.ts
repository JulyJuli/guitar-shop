export class ConfigOptionsService {
    private config = {
        id: 1,
        login: 'admin',
        email: 'admin@mail.com'
      };

      getConfig(field: string): object {
        if (this.isConfigExist(field)) {
          return { field: this.config[field] };
        }
      }
    
      setConfig(newData: {}): object {
        return Object.assign(this.config, newData);
      }
    
      isConfigExist(field: string): boolean {
        return Object.keys(this.config).some(key => key === field);
      }
 };
 