class document {
    "use strict";
    
    let user = {
      get name() {
        return this._name;
      },
    
      set name(value) {
        if (value.length < 4) {
          alert("El nombre es demasiado corto, necesita al menos 4 caracteres");
          return;
        }
        this._name = value;
      }
    };
    
    user.name = "Pete";
    alert(user.name); // Pete
    
    user.name = ""; // El nombre es demasiado corto...
    }