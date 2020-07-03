import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  constructor() { }

  public getData() {
    return this.datos;
   // this.http.get(this.rootURL+'/get_flare', this.options)
  }

  datos =[{"row":"1","column":"1","value":"0","time":"0"},
  {"row":"2","column":"2","value":"0","time":"0"},
  {"row":"1","column":"3","value":"0","time":"0"},
  {"row":"2","column":"4","value":"0","time":"0"},
  {"row":"1","column":"5","value":"1.37178198254347","time":"321"},
  {"row":"2","column":"6","value":"1.85213392198473","time":"374"},{"row":"1","column":"7","value":"0.162904741392903","time":"222"},{"row":"2","column":"8","value":"0.611816120897233","time":"150"},
  {"row":"1","column":"9","value":"0.332635059930075","time":"269"},{"row":"2","column":"10","value":"0","time":"0"},{"row":"1","column":"11","value":"0","time":"0"},
  {"row":"2","column":"12","value":"1.81171383907197","time":"343"},{"row":"1","column":"13","value":"1.47026670076593","time":"396"},{"row":"2","column":"14","value":"0.905693504634969","time":"234"},
  {"row":"1","column":"15","value":"1.67113377897647","time":"435"},{"row":"2","column":"16","value":"1.61641992406206","time":"208"},{"row":"1","column":"17","value":"1.00770749541841","time":"406"},
  {"row":"2","column":"18","value":"0","time":"0"},{"row":"1","column":"19","value":"0","time":"0"},{"row":"2","column":"20","value":"0.190014364481334","time":"140"},
  {"row":"1","column":"21","value":"1.31328441860384","time":"264"},{"row":"2","column":"22","value":"1.6901400867219","time":"343"},
  {"row":"1","column":"23","value":"0.979817203272051","time":"245"},{"row":"2","column":"24","value":"0.96488098343363","time":"302"},{"row":"3","column":"1","value":"0","time":"0"},
  {"row":"4","column":"2","value":"0","time":"0"},{"row":"3","column":"3","value":"0","time":"0"},{"row":"4","column":"4","value":"0.220543408668709","time":"252"},
  {"row":"3","column":"5","value":"1.58138571042245","time":"331"},{"row":"4","column":"6","value":"0.128617332189793","time":"377"},{"row":"3","column":"7","value":"1.38091515132217","time":"209"},{"row":"4","column":"8","value":"0.885887902343276","time":"189"},{"row":"3","column":"9","value":"0","time":"0"},{"row":"4","column":"10","value":"0","time":"0"},{"row":"3","column":"11","value":"0","time":"0"},{"row":"4","column":"12","value":"0.244792766552563","time":"390"},{"row":"3","column":"13","value":"1.10947746192727","time":"351"},{"row":"4","column":"14","value":"1.09204000418476","time":"444"},{"row":"3","column":"15","value":"0.294121668244011","time":"164"},{"row":"4","column":"16","value":"1.54838486764542","time":"149"},{"row":"3","column":"17","value":"0.526894791193658","time":"254"},{"row":"4","column":"18","value":"0","time":"0"},{"row":"3","column":"19","value":"0","time":"0"},{"row":"4","column":"20","value":"1.61089218383328","time":"292"},{"row":"3","column":"21","value":"0.184346709041726","time":"237"},{"row":"4","column":"22","value":"0.134297286143992","time":"242"},{"row":"3","column":"23","value":"1.20190880609738","time":"190"},{"row":"4","column":"24","value":"0.789797236745267","time":"210"},]



}
