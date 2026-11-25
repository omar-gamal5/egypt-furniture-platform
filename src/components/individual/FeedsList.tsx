import React from 'react';
import { useIndividualUser } from '../../contexts/IndividualUserContext';
import { FeedPost } from '../../utils/mockIndividualData';

interface FeedsListProps {
  limit?: number;
}

const FeedsList: React.FC<FeedsListProps> = ({ limit }) => {
  const { feeds, likePost } = useIndividualUser();
  
  // Limit the number of posts if specified
  const displayFeeds = limit ? feeds.slice(0, limit) : feeds;
  
  // Format timestamp to a readable date
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {displayFeeds.map((post) => (
        <article 
          key={post.id} 
          className="bg-white rounded-lg shadow-md p-4 md:p-6"
        >
          <div className="flex items-start space-x-3">
            <img 
              src={post.authorAvatar} 
              alt={post.authorName} 
              className="w-12 h-12 rounded-full object-cover"
            />
            
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-800">{post.authorName}</h3>
                  <p className="text-sm text-gray-500">
                    <span className="capitalize">{post.authorRole}</span> • {formatDate(post.timestamp)}
                  </p>
                </div>
                
                <button 
                  className="text-gray-400 hover:text-gray-600"
                  aria-label="More options"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
              </div>
              
              <div className="mt-3">
                <p className="text-gray-800">{post.content}</p>
                
                {post.images && post.images.length > 0 && (
                  <div className={`mt-3 grid ${post.images.length > 1 ? 'grid-cols-2 gap-2' : 'grid-cols-1'}`}>
                    {post.images.map((image, index) => (
                      <img 
                        key={index}
                        src={image}
                        alt={`Post by ${post.authorName}`}
                        className="rounded-md w-full h-48 md:h-64 object-cover"
                      />
                    ))}
                  </div>
                )}
                
                {post.relatedLink && (
                  <a 
                    href={post.relatedLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-3 block border border-gray-200 rounded-md p-3 hover:bg-gray-50"
                  >
                    <span className="text-blue-600 font-medium">{post.relatedLinkTitle || 'Related Link'}</span>
                    <span className="text-sm text-gray-500 block truncate">{post.relatedLink}</span>
                  </a>
                )}
                
                <div className="mt-4 flex items-center justify-between text-sm">
                  <button 
                    onClick={() => likePost(post.id)}
                    className={`flex items-center space-x-1 ${post.liked ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'}`}
                  >
                    <svg 
                      className="w-5 h-5" 
                      fill={post.liked ? 'currentColor' : 'none'} 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={post.liked ? '0' : '2'} 
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                      />
                    </svg>
                    <span>{post.likes} Likes</span>
                  </button>
                  
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                    <span>{post.comments} Comments</span>
                  </button>
                  
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    <span>{post.shares} Shares</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default FeedsList;