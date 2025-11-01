import React from 'react';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';
import type {Toast as ToastType} from '../hooks/useToast';

interface ToastProps {
    toasts: ToastType[];
    onRemove: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ toasts, onRemove }) => {
    const icons = {
        success: <CheckCircle className="w-5 h-5" />,
        error: <XCircle className="w-5 h-5" />,
        info: <Info className="w-5 h-5" />,
        warning: <AlertTriangle className="w-5 h-5" />,
    };

    const styles = {
        success: 'bg-success text-white',
        error: 'bg-red-500 text-white',
        info: 'bg-blue-500 text-white',
        warning: 'bg-yellow-500 text-black',
    };

    return (
        <div className="fixed top-20 right-4 z-50 space-y-2">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className={`${styles[toast.type]} px-6 py-4 rounded-button shadow-card flex items-center gap-3 min-w-[320px] animate-slide-up`}
                >
                    {icons[toast.type]}
                    <p className="flex-1 font-medium">{toast.message}</p>
                    <button
                        onClick={() => onRemove(toast.id)}
                        className="hover:bg-white/20 rounded p-1 transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Toast;