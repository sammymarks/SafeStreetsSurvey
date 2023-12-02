import React, { useState, useCallback, useRef } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios'
import { Input } from 'reactstrap';
import { Autocomplete, useLoadScript } from '@react-google-maps/api';

import TestMap from './TestMap';

const placesLibrary = ["places"];


const TestAutocomplete = () => {
    
  
    return (
      <div className="TestAutocomplete">
        TEST AUTO COMPLETE
      </div>
    );
  }



export default TestAutocomplete;