import { NotificationManager } from 'react-notifications';

export default function createNotification(type, message) {
    switch (type) {
        case 'info':
            NotificationManager.info(message, 'Info!', 3000);
            break;
        case 'success':
            NotificationManager.success(message, 'Success!', 3000);
            break;
        case 'warning':
            NotificationManager.warning(message, 'Warning!', 3000);
            break;
        case 'error':
            NotificationManager.error(message, 'Error!', 5000);
            break;
    }
};