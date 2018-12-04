
#### esto es para poner notas problemas, links a tutoriales y o articulos donde se solucionen problemas con los que me encontre 

[TUTORIAL PRINCIPAL en youtube](https://www.youtube.com/playlist?list=PLUdlARNXMVkn5_dwhSfC3WzqRrGhsfqu5)


## FIREBASE TUTORIALES COMPLEMENTARIOS
- [FIREBASE Hoisting & deploy](https://www.youtube.com/watch?v=meofoNuK3vo)
- [FIREBASE Storage](https://www.youtube.com/watch?time_continue=296&v=SpxHVrpfGgU)



### ERRORES

#### FIleUpload - firebase STORAGE
- un error boludo que tube fue al hacer el FileUpload, no me andaba aunque si subia el archivo y era porque escribi _state_change_ en lugar de _state_change**d**_
 🤬 :sob:
- en file upload tube problemas con el sincronismo porque para cuando se dibujaba la imajen aun no tenia el url de la imagen subida asi que no mostraba nada, encontre como arreglarlo en [este link de la docu de firebase](https://firebase.google.com/docs/storage/web/upload-files?hl=es-419) ahi buscar **uploadTask**, y mientras lo arreglaba vi que tenia problemas con el _this_ del setState, porque el call back era una funcion y no una arrow function para ver la diferencia ver este link [arrow functions](https://www.youtube.com/watch?v=W6n1uN423PM)
----

#### Read an write - firebase DATABASE
- conectando con la base de datos tube el simple problema de que la configuracion de la base de datos etaba bloqueada para lectura escritura, pero como no me di cuenta aprendi otras cosas la documentacion esta en este link [lectura y escritura en firebase DATABASE](https://firebase.google.com/docs/database/web/read-and-write), pero lo que en realidad me salvo fue [**este video**: Firebase:Database Listener at :failed permission denied](https://www.youtube.com/watch?v=Wy8TbfwuvR8).

asi que por favor coorobora que la configuracion de la base de datos este asi primero
```json
  {
    /* Visit https://firebase.google.com/docs/database/security to learn more about security rules. */
    "rules": {
      ".read": true,
      ".write": true
    }
  }
```
#### SCSS
- tube que agregar por mi parte node-sass
```npm install node-sass```
