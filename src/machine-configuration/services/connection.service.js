export const testConnection = async (config) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (config.protocol && (config.ipAddress || config.networkId)) {
                resolve({
                    success: true,
                    details: `Connected via ${config.protocol} to ${config.ipAddress || config.networkId}`,
                });
            } else {
                reject(new Error('Connection failed. Please check your configuration.'));
            }
        }, 1000);
    });
};