import { Component, type ReactNode, type ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

export class ErrorBoundary extends Component<Props, State> {
  // 1. Initial State
  public state: State = {
    hasError: false,
    errorMessage: '',
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMessage: error.message };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className='min-h-screen p-4 max-w-6xl mx-auto flex items-center justify-center'>
          <div className='text-lg'>
            <h1>Sorry.. there was an error</h1>
            <a href='/' className='text-blue-600 underline hover:text-blue-300 transition'>Go back to home screen</a>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
