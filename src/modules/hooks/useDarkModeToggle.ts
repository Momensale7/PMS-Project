import  { useEffect, useState } from 'react';

const useDarkModeToggle = () => {
  // Retrieve the initial state from localStorage or default to false
  const savedDarkMode = localStorage.getItem('darkMode') === 'true';
  const [darkMode, setDarkMode] = useState<boolean>(savedDarkMode);

  useEffect(() => {
    const htmlEl = document.documentElement;

    // Set the theme attribute on the <html> element
    if (darkMode) {
      htmlEl.setAttribute('theme', 'dark');
    } else {
      htmlEl.removeAttribute('theme');
    }

    // Store the current theme preference in localStorage
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  return { darkMode, setDarkMode };
}

export default useDarkModeToggle;
