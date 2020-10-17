import React from 'react';
import { LanguageDDL } from './LanguageDDL';
import { StudentDDL } from './StudentDDL';

export const Demo: React.FC = () => {
  
  return (
    <>
      <h1 style={{textAlign: 'center'}} >DEMO</h1>

      <div style={{ width: '600px', marginLeft: '20px', marginBottom: '40px' }}>
        <LanguageDDL/>
      </div>
      <div style={{ width: '600px', marginLeft: '20px', marginBottom: '40px' }}>
        <StudentDDL/>
      </div>
      <div style={{ width: '600px', marginLeft: '20px', marginBottom: '40px' }}>
        <LanguageDDL/>
      </div>
      <div style={{ width: '600px', left: '20px', bottom: 0, position: 'fixed' }}>
        <StudentDDL/>
      </div>
    </>
  );
};
