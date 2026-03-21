import React, { useState } from 'react';
import { Languages, Heart, X, Plus } from 'lucide-react';

interface Props {
  languages: string[];
  hobbies: string[];
  onLanguagesChange: (data: string[]) => void;
  onHobbiesChange: (data: string[]) => void;
}

export const AdditionalForm: React.FC<Props> = ({
  languages,
  hobbies,
  onLanguagesChange,
  onHobbiesChange,
}) => {
  const [newLanguage, setNewLanguage] = useState('');
  const [newHobby, setNewHobby] = useState('');

  const addLanguage = () => {
    if (newLanguage.trim() && !languages.includes(newLanguage.trim())) {
      onLanguagesChange([...languages, newLanguage.trim()]);
      setNewLanguage('');
    }
  };

  const removeLanguage = (lang: string) => {
    onLanguagesChange(languages.filter(l => l !== lang));
  };

  const addHobby = () => {
    if (newHobby.trim() && !hobbies.includes(newHobby.trim())) {
      onHobbiesChange([...hobbies, newHobby.trim()]);
      setNewHobby('');
    }
  };

  const removeHobby = (hobby: string) => {
    onHobbiesChange(hobbies.filter(h => h !== hobby));
  };

  const commonLanguages = [
    'English (Native)', 'English (Fluent)', 'Spanish (Intermediate)',
    'French (Basic)', 'German (Intermediate)', 'Mandarin (Conversational)',
    'Hindi (Native)', 'Japanese (Basic)', 'Korean (Basic)'
  ];

  const commonHobbies = [
    'Reading', 'Photography', 'Traveling', 'Cooking', 'Gaming',
    'Sports', 'Music', 'Art', 'Writing', 'Volunteering'
  ];

  return (
    <div className="space-y-6">
      {/* Languages */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Languages className="w-5 h-5 text-indigo-600" />
          Languages
        </h3>

        <div className="flex gap-2">
          <input
            type="text"
            value={newLanguage}
            onChange={(e) => setNewLanguage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addLanguage())}
            placeholder="e.g., Spanish (Fluent)"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <button
            type="button"
            onClick={addLanguage}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {languages.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {languages.map((lang) => (
              <span
                key={lang}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-800 rounded-full text-sm"
              >
                {lang}
                <button
                  type="button"
                  onClick={() => removeLanguage(lang)}
                  className="hover:text-green-900"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}

        <div>
          <p className="text-xs text-gray-500 mb-2">Quick add:</p>
          <div className="flex flex-wrap gap-2">
            {commonLanguages
              .filter(lang => !languages.includes(lang))
              .slice(0, 6)
              .map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => onLanguagesChange([...languages, lang])}
                  className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs hover:bg-gray-200"
                >
                  + {lang}
                </button>
              ))}
          </div>
        </div>
      </div>

      {/* Hobbies */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Heart className="w-5 h-5 text-indigo-600" />
          Hobbies & Interests
        </h3>

        <div className="flex gap-2">
          <input
            type="text"
            value={newHobby}
            onChange={(e) => setNewHobby(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addHobby())}
            placeholder="e.g., Photography, Hiking"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <button
            type="button"
            onClick={addHobby}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {hobbies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {hobbies.map((hobby) => (
              <span
                key={hobby}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-100 text-purple-800 rounded-full text-sm"
              >
                {hobby}
                <button
                  type="button"
                  onClick={() => removeHobby(hobby)}
                  className="hover:text-purple-900"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}

        <div>
          <p className="text-xs text-gray-500 mb-2">Quick add:</p>
          <div className="flex flex-wrap gap-2">
            {commonHobbies
              .filter(hobby => !hobbies.includes(hobby))
              .slice(0, 6)
              .map((hobby) => (
                <button
                  key={hobby}
                  type="button"
                  onClick={() => onHobbiesChange([...hobbies, hobby])}
                  className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs hover:bg-gray-200"
                >
                  + {hobby}
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
