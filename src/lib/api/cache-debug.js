/**
 * @flow
 * @format
 */

/**
 * External dependencies
 */
import gql from 'graphql-tag';

/**
 * Internal dependencies
 */
import API from 'lib/api';

const mutation = gql`
  mutation DebugPageCacheMutation(
		$appId: Int!
		$envId: Int!
		$url: String!
	) {
    debugPageCache( input: {
			appId: $appId
			environmentId: $envId
			url: $url
		} ) {
      success
      insights {
        category
        name
        html
        type
      }
      edge {
        statusCode
        headers {
          name
          value
        }
      }
      origin {
        statusCode
        headers {
          name
          value
        }
      }
    }
  }
`;

// The subquery for environments lets users choose any environment, including production.
export const appQuery = `
	id
	name
	environments {
		id
		appId
		name
		primaryDomain {
			name
		}
		type
	}
`;

export async function debugCache( appId: number, envId: number, url: Array<string> ) {
	const api = await API();

	const variables = {
		appId,
		envId,
		url,
	};

	const response = await api.mutate( { mutation, variables } );

	const { data: { debugPageCache } } = response;

	return debugPageCache;
}
