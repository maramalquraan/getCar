// BEHOLD !!! ... the main module of this app in all of its glory.
angular.module('get-car', ['angular.filter']);


// Our app's map : 
/*
                            The head bar
                          |-- 'headbar'
                          |
                          | The side bar    The center of the page
                          |-- 'filters' ---- 'show'
                          |
                          | The log in page
App Name  Main Component  |-- 'logIns'
						  |
'get-car' ---- 'app' -----|
						  | The sign up page
                          |-- 'signUp'
                          |
                          | The car submitting page
                          |-- 'add'
                          |
                          | The about page
                          |-- 'aboet'
*/
/*
               _       _                 _   
              | |     | |               | |  
__      ____ _| |_ ___| |__   ___  _   _| |_ 
\ \ /\ / / _` | __/ __| '_ \ / _ \| | | | __|
 \ V  V / (_| | || (__| | | | (_) | |_| | |_ 
  \_/\_/ \__,_|\__\___|_| |_|\___/ \__,_|\__|
                                             

               　　　　　　∧__∧

 　　　　　　　　　　　 　( ͡° ͜ʖ ͡°)

 　　　　　　　　　　　 　⊂　　つ
 　　　　　　　　　　　　　(つ ﾉ
 　　　　　　　　　　　　　 (ノ
 　　　　　＼　　　　　　☆
 　　　　　　　　　　　　　|　　　　　☆
 　　　　　　　　　　(⌒ ⌒ヽ　　　/
　　　 　＼　　（´⌒　　⌒　　⌒ヾ　　　／
 　　　　　 （’⌒　;　⌒　　　::⌒　　）
 　　　　　（´　　　　　）　　　　　:::　）　／
 　　☆─　（´⌒;:　　　　::⌒`）　:;　　）
 　　　　　（⌒::　　　::　　　　　::⌒　）
 　　 　／　（　　　　ゝ　　ヾ　丶　　ソ　─
 */