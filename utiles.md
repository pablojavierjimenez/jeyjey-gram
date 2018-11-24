
#### esto es para poner notas problemas, links a tutoriales y o articulos donde se solucionen problemas con los que me encontre 

[TUTORIAL PRINCIPAL en youtube](https://www.youtube.com/playlist?list=PLUdlARNXMVkn5_dwhSfC3WzqRrGhsfqu5)


## FIREBASE TUTORIALES COMPLEMENTARIOS
[FIREBASE Hoisting & deploy](https://www.youtube.com/watch?v=meofoNuK3vo)
[FIREBASE Storage](https://www.youtube.com/watch?time_continue=296&v=SpxHVrpfGgU)



###ERRORES 
- un error boludo que tube fue al hacer el FileUpload, no me andaba aunque si subia el archivo y era porque escribi _state_change_ en lugar de _state_change**d**_
 🤬 :sob:
- en file upload tube problemas con el sincronismo porque para cuando se dibujaba la imajen aun no tenia el url de la imagen subida asi que no mostraba nada, encontre como arreglarlo en [este link de la docu de firebase](https://firebase.google.com/docs/storage/web/upload-files?hl=es-419) ahi buscar **uploadTask**, y mientras lo arreglaba vi que tenia problemas con el _this_ del setState, porque el call back era una funcion y no una arrow function para ver la diferencia ver este link [arrow functions](https://www.youtube.com/watch?v=W6n1uN423PM)
