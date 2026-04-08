import * as React from 'react';
import { Pagination } from '@shopify/hydrogen';

/**
 * <PaginatedResourceSection > is a component that encapsulate how the previous and next behaviors throughout your application.
 * @param {Class<Pagination<NodesType>>['connection']>}
 */
export function PaginatedResourceSection({
  connection,
  children,
  resourcesClassName,
}) {
  return (
    <Pagination connection={connection}>
      {({ nodes, isLoading, PreviousLink, NextLink }) => {
        const resourcesMarkup = nodes.map((node, index) =>
          children({ node, index }),
        );

        return (
          <div className='collection-wrapper'>
            {resourcesClassName ? (
              <div className={`${resourcesClassName} products-grid`}>{resourcesMarkup}</div>
            ) : (
              <div className="products-grid">{resourcesMarkup}</div>
            )}
            {/* <div className='pagination-wrapper'>
              <PreviousLink className='common-button'>
                {isLoading ? 'Loading...' : <span className='f-18 f-m-18 w-400 ff-n l-h-1 white-color'>Load previous</span>}
              </PreviousLink>
            </div> */}
            <div className='pagination-wrapper'>
              <NextLink className='common-button'>
                {isLoading ? <span className='f-14 f-m-14 w-400 ff-n l-h-1 white-color'>Loading...</span> : <span className='f-14 f-m-14 w-400 ff-n l-h-1 white-color'>Load more</span>}
              </NextLink>
            </div>
          </div>
        );
      }}
    </Pagination>
  );
}
