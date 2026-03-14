import { useEffect, useReducer } from 'react';
import { compendiumReducer } from '../../state/compendiumReducer';
import { initialState } from '../../state/compendiumReducer';
import { fetchCompendiumItems } from '../../services/compendiumService';
import { VirtualList } from '../VirtualList/VirtualList';

export const Compendium = () => {
  const [state, dispatch] = useReducer(compendiumReducer, initialState);

  useEffect(() => {
    const loadWrapper = async () => {
      dispatch({ type: 'FETCH_START' }); // Start loading

      try {
        const data = await fetchCompendiumItems();
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error: unknown) {
        let errorMessage = 'An unknown error occured';

        if (error instanceof Error) {
          errorMessage = error.message;
        } else if (typeof error === 'string') {
          errorMessage = error;
        }
        dispatch({
          type: 'FETCH_ERROR',
          payload: errorMessage || 'Unknown Error',
        });
      }
    };

    loadWrapper();
  }, []);

  if (state.isLoading) return <div>Loading Compendium...</div>;
  if (state.error)
    return <div style={{ color: 'red' }}> Error: {state.error}</div>;

  return (
    <div className='max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md'>
      <h2 className='text-2xl font-bold mb-4 text-gray-800'>Item Compendium</h2>
      <VirtualList
        items={state.items}
        itemHeight={80}
        containerHeight={600}
        renderItem={(item, index) => (
          <div className='border-b border-gray-200 h-full flex flex-col justify-center px-4 hover:bg-gray-50 transition-colors'>
            <strong className='text-gray-900 font-semibold'>
              #{index}: {item.name}
            </strong>
            <span className='text-sm text-gray-500 truncate'>
              {item.descriptionHtml}
            </span>
          </div>
        )}
      />
    </div>
  );
};