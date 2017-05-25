var myApp = angular.module('myApp', ['ngSanitize'])
.directive('compile', ['$compile', function ($compile) {
      return function(scope, element, attrs) {
          scope.$watch(
            function(scope) {
               // watch the 'compile' expression for changes
              return scope.$eval(attrs.compile);
            },
            function(value) {
              // when the 'compile' expression changes
              // assign it into the current DOM
              element.html(value);

              // compile the new DOM and link it to the current
              // scope.
              // NOTE: we only compile .childNodes so that
              // we don't get into infinite loop compiling ourselves
              $compile(element.contents())(scope);
            }
        );
    };
}]);

myApp.controller('appCtrl', ['$scope', '$http', '$sce', function($scope, $http,$sce) {
    $scope.baba = [0,1,0,1,0];
    console.log("Hello World from controller");
    $scope.data = [];
    $scope.input = [];
    $scope.skip = 0;
    $scope.class = 'works';
    $scope.chStatus = {
        nowCh : 1,
        nowSubCh : 1, 
        status : false,
    }
    var dummy = [];
    dummy[0] = [{
        ch : 1,
        subCh : 1,
        nextCh : 1,
        nextSubCh : 2,
        name : 'การเงินในชีวิตประจำวัน',
        subName : 'เงินของคุณตอนนี้อยู่ที่ไหน',
        level : 'มือใหม่',
        by : 'Neural',
        numRead : 0,
        numShare : 0,
        date : new Date(),
        func : [
            //Part Content
            {
                name : 'createContent',
                value : 'ถ้าพูดถึงการลงทุนกับเกม นักลงทุนก็คือตัวละครในเกมที่มีอิสรภาพทางการเงินเป็นบอสใหญ่'
            },
            {
                name : 'createContent',
                value : 'ถ้าหากสามารถชนะบอสได้ก็จะมีเงินใช้ไปแบบไม่อั้น ไม่ต้องมานั่งกังวลอะไรเกี่ยวกับเงินอีกต่อไป'
            },
            {
                name : 'createContent',
                value : 'แต่ทว่ามีโอกาสน้อยนักที่ผู้เล่นทั่วไปจะรู้ถึงวิธีการเข้าถึงการต่อสู้กับบอส ซึ่งหนึ่งในการเข้าต่อสู้กับบอสก็คือ'
            },
            {
                name : 'createQuote',
                value : 'การลงทุนในตลาดหลักทรัพย์',
                position : 'center'
            },
            {
                name : 'createContent',
                value : 'ก่อนอื่นเราลองไปสำรวจตัวเองกันก่อนดีกว่าว่าตอนนี้เรามีอะไรอยู่ในมือกันบ้าง'
            },
            {
                name : 'createHr'
            },
            
        

            //Part Game
            {
                name : 'createHead',
                value : 'มาทดลองกัน!!'
            },
            {
                name : 'createContent',
                value : 'อย่างแรกลองเพิ่มข้อมูลลงไปในช่องที่กำหนดให้ว่าตัวเองมีทรัพย์สินอะไรอยู่บ้าง'
            },
            {
                name : 'createContent',
                value : 'โดยทรัพย์สินในที่นี้ให้ใส่ราคาลงไปทั้งเงินและสิ่งของ ทุกๆอย่างที่มี ยกตัวอย่างเช่น'
            },
            //example
            {
                name : 'createListInput',
                canChange : false,
                type : ['text','number'],
                head : ['รายการ','มูลค่า(บาท)'],
                holder : ['text','number'],
                sizePer : ['70','30'],
                data : [
                    ['เงินสด(กระเป๋าตัง+ธนาคาร)',15000],
                    ['โทรศัพท์',20000],
                    ['เสื้อผ้า',6000],
                    ['หนังสือการ์ตูน',3000],
                    ['คอมพิวเตอร์',35000],
                ]
            },
            {
                name : 'createContent',
                value : 'เอาล่ะ ถึงตาคุณแล้ว'
            },


            {
                name : 'createListInput',
                canChange : true,
                type : ['text','number'],
                head : ['รายการ','มูลค่า(บาท)'],
                holder : ['list','value'],
                sizePer : ['70','30'],
                data : [
                    ['',''],
                    ['','']
                ]
            },
            {
                name : 'createHead',
                value : 'สรุปเกม'
            },
            {
                name : 'createContent',
                value : 'พอลองมานั่งดูกันแล้วก็จะพบว่าตัวเราเองก็มีทรัพย์สินอยู่บ้าง คำถามคือทรัพย์สินทั้งหมดที่เรามีนั้นใช่เงินที่เราสามารถนำมาลงทุนได้หรือไม่ คำตอบคือ ยังไม่ใช่นะครับ'
            },
        ],
        status : false,
        pastBefore : false,
        chBefore : null,
    },{
        ch : 1,
        subCh : 2,
        nextCh : 1,
        nextSubCh : 3,
        name : 'การเงินในชีวิตประจำวัน',
        subName : 'ทรัพย์สิน และ หนี้สิน',
        level : 'มือใหม่',
        by : 'Neural',
        numRead : 0,
        numShare : 0,
        date : new Date(),
        func : [
            {
                name : 'createContent',
                value : 'จากบทที่แล้ว เราคงเห็นแล้วว่าภายในตัวเรามีอะไรอยู่บ้าง หลักการง่ายๆที่จะทำให้เรารวยได้ก็คือ มีทรัพย์สินให้มาก และมีหนี้สินให้น้อย'
            },
            {
                name : 'createContent',
                value : 'ดังนั้น ต่อไปเราจึงต้องเรียนรู้ว่าสิ่งที่เรามีอยู่นั้นอะไรคือหนี้สิน และอะไรคือทรัพย์สิน'
            },
            {
                name : 'createQuote',
                value : 'ทรัพย์สิน คือ สิ่งที่สามารถทำเงินให้คุณ',
                position : 'center'
                
            },
            {
                name : 'createQuote',
                value : 'หนี้สิน คือ สิ่งที่ทำให้คุณต้องเสียเงิน',
                position : 'center'
                
            },
            {
                name : 'createContent',
                value : 'ของสิ่งเดียวกันอาจเป็นได้ทั้งทรัพย์สินและหนี้สิน เช่น บ้าน ถ้าบ้านยังต้องผ่อน เสียดอกเบี้ยให้ธนาคาร บ้านหลังนั้นก็มีสภาพเป็นหนี้สิน แต่ถ้าเป็นบ้านที่เราซื้อมาแล้ว นำไปปล่อยให้เช่า สร้างรายได้ให้กับเราได้ บ้านหลังนั้นก็คือทรัพย์สิน'
            },
            {
                name : 'createMoreContent',
                head : 'ตัวอย่างการดูหนี้สินแล้วทรัพย์สิน',
                content : '<p>รถยนต์ คือสิ่งหนึ่งที่คนเข้าใจผิดกันมาก เมื่อซื้อมาแล้วคนมักจะคิดว่ารถยนต์คือทรัพย์สิน แต่ลองมาพิจารณาดูนะครับ</p><br><p>1. รถที่คุณซื้อมาแล้ว ถ้าคุณจะขายต่อเลย ราคามันละลดลงหรือเพิ่มขึ้น?</p><br><p>2. รถของคุณ เมื่อซื้อมาแล้วคุณต้องเสียเงินไปกับมันเพิ่มขึ้นอีกเรื่อยๆหรือไม่?</p><br><p>จะเห็นว่า รถเมื่อซื้อมาแล้ว หากคุณขายต่อราคามันก็น้อยลงไปแล้ว นั่นก็คือมันทำให้คุณเสียเงินนั่นเอง แต่ถึงคุณจะไม่ขาย แต่ใช้ๆไปคุณก็ต้องเสียเงินค่าบำรุงรักษา ค่าน้ำมัน ค่าประกัน ค่าอะไรสารพัด</p><br><p>สรุปก็คือ ไม่ว่าทางไหนรถยนต์ก็คือสิ่งที่ทำให้คุณเสียเงิน ดังนั้นเราจึงมักจัดมันให้เป็นหนี้สินนั่นเอง</p> '
            },
            {
                name : 'createContent',
                value : 'สรุปง่ายๆ วิธีการตัดสินใจว่าของสิ่งหนึ่งเป็นทรัพย์สินหรือหนี้สินก็คือ การตั้งคำถามว่า ของสิ่งนี้ทำเงินให้เราได้หรือไม่ หรือว่าทำให้เราเสียเงินนั่นเอง'
            },
            {
                name : 'createContent',
                value : 'ทีนี้ ลองมาแยกกันดูซัก 2-3 ข้อ ว่าข้อไหนบ้างที่เป็นหนี้สิน ข้อไหนเป็นทรัพย์สิน'
            },
            {
                name : 'createContent',
                value : '1. โทรศัพท์มือถือ ราคา 21000 บาท จ่ายค่าโทรศัพท์เดือนละ 400 บาททุกเดือน'
            },
            {
                name : 'createContent',
                value : '2. เงินฝากในธนาคาร 2000 บาท'
            },
            {
                name : 'createContent',
                value : '3. รถแท็กซี่ 10 คัน ปล่อยให้เช่าวันละ 800 บาท'
            },
            
            

        ],
        status : false,
        pastBefore : false,
        chBefore : null,
    },{
        ch : 1,
        subCh : 3,
        nextCh : 1,
        nextSubCh : 4,
        name : 'การเงินในชีวิตประจำวัน',
        subName : 'งบการเงิน',
        level : 'มือใหม่',
        by : 'Neural',
        numRead : 0,
        numShare : 0,
        date : new Date(),
        func : [
            {
                name : 'createContent',
                value : 'หลังจากที่เรารู้เกี่ยวกับทรัพย์สินและหนี้สินแล้ว เราจะได้มารู้จักกับงบดุลกัน'
            },
            {
                name : 'createContent',
                value : 'สมการทั่วไปของการคำนวณทรัพย์สินที่เรามีอย่างแท้จริงคือ'
            },
            {
                name : 'createQuote',
                value : 'ทรัพย์สิน = ทุน + หนี้สิน',
                position : 'center'
            },
            {
                name : 'createContent',
                value : 'อาจจะยังไม่เข้าใจกัน เราลองมาดูว่าจากบทที่แล้ว ถ้าหากมือถือของเรามีราคา 20000 แต่ยังต้อมีการผ่อนอีก 15000 เงินที่ต้องผ่อนก็คือหนี้สินที่เรามีนั่นเอง ทุนที่เรามีจึงมีแค่ 5000 บาท'
            },
            {
                name : 'createContent',
                value : 'ลองไปดูตัวอย่างเต็มๆกัน'
            },          
            {
                name : 'createHr'
            },
            {
                name : 'createContent',
                value : 'นี่คือตัวอย่างของการคำนวณทรัพย์สินนะครับ'
            }, 
             //////////////
            
            {
                name : 'createListInput',
                canChange : false,
                type : ['text','number'],
                head : ['รายการ','มูลค่า(บาท)'],
                holder : ['list','value'],
                sizePer : ['70','30'],
                data : [
                    ['เงินสด(กระเป๋าตัง+ธนาคาร)',15000],
                    ['โทรศัพท์',20000],
                    ['เสื้อผ้า',6000],
                    ['หนังสือการ์ตูน',3000],
                    ['คอมพิวเตอร์',35000],
                ],
                layout : {
                    col : 6,
                    height : 50,
                }
            },
            {
                name : 'createListInput',
                canChange : false,
                type : ['text','number'],
                head : ['รายการ','มูลค่า(บาท)'],
                holder : ['list','value'],
                sizePer : ['70','30'],
                data : [
                    ['ผ่อนโทรศัพท์',10000],
                    ['ผ่อนคอมพิวเตอร์',20000]
                ],
                layout : {
                    col : 6,
                    height : 25,
                }
            },
            {
               name : 'createHead',
               value : 'ทุนที่มี คือ 49000',
                layout : {
                    col : 6,
                    height : 25,
                }
            },
            {
                name : 'showValue',
                data : 12,
                ind : 1
            },
            //////////////

            {
                name : 'createContent',
                value : '<br><p>อะ ที่นี้ถึงตาคุณแล้ว ลงใส่ลงไปดูนะ</p>'
            }, 
           //////////////
            
            {
                name : 'createListInput',
                canChange : true,
                type : ['text','number'],
                head : ['รายการ','มูลค่า(บาท)'],
                holder : ['list','value'],
                sizePer : ['70','30'],
                data : [
                    ['', ''],
                    ['', ''],
                ],
                layout : {
                    col : 6,
                    height : 50,
                }
            },
            {
                name : 'createListInput',
                canChange : true,
                type : ['text','number'],
                head : ['รายการ','มูลค่า(บาท)'],
                holder : ['list','value'],
                sizePer : ['70','30'],
                data : [
                    ['', ''],
                    ['', ''],
                ],
                layout : {
                    col : 6,
                    height : 25,
                }
            },
            {
               name : 'createHead',
               value : 'ทุนของคุณ คือ 0',
                layout : {
                    col : 6,
                    height : 25,
                }
            },
            {
                name : 'showValue',
                data : 12,
                ind : 1
            },
            //////////////
            {
                name : 'createContent',
                value : '<br><p>สิ่งที่เรากำลังทำอยู่นี้ในทางเศรษฐศาสตร์เราเรียกว่า “งบดุล”</p><br>'
            },
            {
                name : 'createMoreContent',
                head : 'เพิ่มเติม: การอ่านงบรายรับ-รายจ่าย',
                content : '<p>นอกจากการพิจารณางบดุลแล้ว อีกสิ่งหนึ่งที่เราควรดูคืองบรายรับ-รายจ่าย เพื่อดูว่าในชีวิตประจำวันทั่วไปของเรา มีเงินตรงไหนบ้างที่เป็นรายรับและตรงไหนที่เป็นรายจ่าย ซึ่งงบรายรับ-รายจ่ายนั้นมีความสัมพันธ์กับงบดุลเป็นอย่างมาก</p><br><p>สิ่งหนึ่งที่ทำให้เราสามารถแยกคนรวยและคนทั่วไปออกจากกันได้ก็คือการจัดการกับงบรายรับ-รายจ่าย และงบดุลนี่ล่ะ เราลองไปดูกระแสเงินสดของคนทั้งสองประเภทนี้กัน</p><center><img src=\'images/plearn/education/cashflow.jpg\' style=\'width:700px\'></center><p>กระแสเงินสดของคนทั่วไป จะเกิดจากการทำงานเพื่อให้ได้เงินมา จากนั้นจะนำเงินไปที่ไปใช้จ่ายกับการใช้จ่ายในชีวิตประจำวัน และนำไปชำระหนี้สินที่มี</p><br><p>ในขณะที่ กระแสเงินสดของคนรวย จะพบว่ารายรับของคนรวยนั้นเกิดจากทุนที่เขามีทั้งสิ้น ซึ่งเงินเหล่านั้นจะมีปริมาณมากกว่าเงินที่ได้จากการทำง การหักค่าใช้จ่ายออกไปจึงไม่มีผลมากนัก<p>ขอให้ผู้อ่านตระหนักไว้เสมอว่า ถ้าเราอยากรวยเราต้องเปลี่ยนแนวคิดของการบริหารเงินซะ เพราะ</p><br><center><h4>"คนจนและคนชั้นกลางทำงานเพื่อเงิน แต่คนรวยให้เงินทำงานแทนเขา"</h4></center>'
            },
            

        ],
        status : false,
        pastBefore : false,
        chBefore : null,
    },{
        ch : 1,
        subCh : 4,
        nextCh : 2,
        nextSubCh : 1,
        name : 'การเงินในชีวิตประจำวัน',
        subName : 'ทุนของคุณ',
        level : 'มือใหม่',
        by : 'Neural',
        numRead : 0,
        numShare : 0,
        date : new Date(),
        func : [
            {
                name : 'createContent',
                value : 'เพียงเท่านี้คุณก็รู้แล้วล่ะ ว่าเงินส่วนไหนคือส่วนที่คุณสามารถนำมาใช้ได้'
            },
            {
                name : 'createContent',
                value : 'ในการลงทุน คุณสามารถนำเงินมาลงทุนเท่าไหร่ก็ได้ แต่ทางเราขอแนะนำว่าเงินส่วนนั้นควรจะเป็นเงินก้อนที่ไม่ส่งผลกระทบให้การดำเนินชีวิตประจำวันของคุณต้องเดือดร้อน และเป็นเงินที่เรายอมให้มาอยู่นิ่งๆในพอร์ทของเราได้'
            },
            {
                name : 'createContent',
                value : 'ถ้าพร้อมแล้ว ไปบทต่อไปกันเลยยยย'
            },
        ],
        status : false,
        pastBefore : false,
        chBefore : null,
    }]

    dummy[1] = [{
        ch : 2,
        subCh : 1,
        nextCh : 2,
        nextSubCh : 1,
        name : 'พื้นฐานการลงทุน',
        subName : 'ทำไมต้องลงทุนกันนะ ?',
        level : 'มือใหม่',
        by : 'Neural',
        numRead : 0,
        numShare : 0,
        date : new Date(),
        func : [
            {
                name : 'lockContent',
            },
            
        ],
        status : false,
        pastBefore : false,
        chBefore : null,
    }]
    //$scope.data = [':content:เนื้อหา',':head:หัวข้อ',':quote:คำคม',':moreContent:งบดุล',':head:กราฟ',':pic2::left:ch4-2-1.png',':head:รูปภาพตรงกลาง',':pic::center:icon_1.jpg',':func:0'];

    createPrintOut = function(ind){
        var text = $scope.education.func[ind].value
        $scope.data[ind] = "<h1 class='elmContent' id='test'>"+text+"</h1>";
    }

    $scope.sumValue = function(ind){
        var sum = 0;
        var data = $scope.education.func[$scope.education.func[ind].data].data; 
        var dataInd = $scope.education.func[ind].ind;
        for(i=0;i<data.length;i++){
            sum += data[i][dataInd];
        }
        $scope.data[ind] = '<p class="elmContent">&emsp; &emsp; &emsp;รวม '+sum+' บาท</p>';
    }

    sumValue = function(ind){
        $scope.sumValue(ind);
    }

    showValue = function(ind){
        
        $scope.data[ind] = '<p class="elmContent" ng-click="sumValue(ind)"></p>';
    }

    createListInput = function(ind){
        $scope.data[ind] = '<table style="width:100%">';
        var sizePer = $scope.education.func[ind].sizePer;
        var head = $scope.education.func[ind].head;
        var holder = $scope.education.func[ind].holder;
        var type = $scope.education.func[ind].type;
        var data = $scope.education.func[ind].data;
        $scope.input[ind] = data;
        var disable = ''; 
        if(!$scope.education.func[ind].canChange){
            disable = 'disabled';
        }

        for(var i = 0;i< sizePer.length; ++i){
            $scope.data[ind]+= '<col width="'+sizePer[i]+'%">'
        }
        $scope.data[ind] += '<tr>';
        for(var j = 0;j < type.length ; ++j){
            $scope.data[ind] += '<th style="padding-bottom:5px">'+head[j]+'</th>';
        }
        //for sum value of item list
        $scope.data[ind] += '</tr>';
            for(var i = 0;i< data.length ; ++i){
                $scope.data[ind] += '<tr>';
                for(var j = 0;j < type.length ; ++j){
                    $scope.data[ind] += '<td><input type="'+type[j]+'" class="form-control" placeholder="'+holder[j]+'" value="'+data[i][j]+'" '+disable+' ng-model="input['+ind+']['+i+']['+j+']"></td>';
                }
                $scope.data[ind] += '</tr>';
            }
            $scope.data[ind] += '<tr>';
            for(var j = 0;j < type.length ; ++j){
                if(type[j] == 'number'){
                    $scope.data[ind] += '<td><input type="'+type[j]+'" class="form-control" disabled value="{{sumValue(input['+ind+'],'+j+')}}"></td>';
                }else{
                    $scope.data[ind] += '<td><input type="'+type[j]+'" class="form-control" value="" disabled></td>';
                }
            }
            $scope.data[ind] += '</tr>';
        $scope.data[ind] += '</table>';
        //<div ng-repeat="test in education.func['+ind+'].data track by $index" ng-bind-html="education.func['+ind+'].data[$index]"></div>

        if($scope.education.func[ind].canChange){
            $scope.data[ind] += '<button  class="btn btn-default" ng-click="addNewChoice('+ind+')">Add fields</button>';
            if($scope.education.func[ind].data.length > 1){
                $scope.data[ind] += '<button  class="btn btn-default" ng-click="removeNewChoice('+ind+')">Remove fields</button>';
            }
        }

        if($scope.education.func[ind].hasOwnProperty('layout')){
                setLayout(ind)
            }
    }

    $scope.addNewChoice = function(ind){
        $scope.education.func[ind].data.push(['','']);
        createListInput(ind);
    }

    $scope.removeNewChoice = function(ind){
        $scope.education.func[ind].data.pop();
        createListInput(ind);
    }

    $scope.sumValue = function(data,ind){
        var sum = 0;
        for(var i=0;i<data.length;i++){
            sum += parseFloat(data[i][ind]);
        }
        return sum;
    }

    createSelect = function(ind){
        var value = $scope.education.func[ind].value;
        var option = $scope.education.func[ind].option;
        $scope.data[ind] = "<select>";
        for(var i = 0 ; i < value.length ; ++i){
            $scope.data[ind] += ' <option value="'+value[i]+'">'+option[i]+'</option>';
        }
    }

    createChart = function(ind){
        var position = $scope.education.func[ind].position;
        if(position === 'center'){
            $scope.data[ind] = "<div id='myChart'></div>";
        }
        else{
            $scope.data[ind] = "<div id='myChart'></div>";
        }
    }

    createContent = function(ind){
        var text = $scope.education.func[ind].value;
        $scope.data[ind] = "<p class='elmContent'> &emsp; &emsp; &emsp;"+ text +"</p>";
        if($scope.education.func[ind].hasOwnProperty('layout')){
            setLayout(ind)
        }
        
    }

    setLayout= function(ind){
        var col = $scope.education.func[ind].layout.col;
        var height = $scope.education.func[ind].layout.height;

        $scope.data[ind] = "<div class='col-md-"+col+"' style='height:"+height+"%;overflow:auto;border:1px solid #ddd'>"+ $scope.data[ind] +"</div>";
    }

    createNewline = function(ind){
        var num = $scope.education.func[ind].value;
        for(var i=0; i<num ; i++)
        {
           $scope.data[ind] = "<br>"; 
        }
    }
    createHr = function(ind){
        $scope.data[ind] = "<center> <hr style = 'width: 75%;' > </center>"; 
    }
    createHead = function(ind){
        var text = $scope.education.func[ind].value;
        $scope.data[ind] = "<h3 class='elmContent'>"+ text +"</h3>";
        if($scope.education.func[ind].hasOwnProperty('layout')){
            setLayout(ind)
        }
    }

    lockContent = function(ind){
        $scope.data[ind] = "<center style='padding:30px;'><h3 class='elmContent'>กำลังอยู่ในช่วงพัฒนาเนื้อหา</h3><h3 class='elmContent'>กดติดตามเพื่อให้เราแจ้งเตือนเมื่อเนื้อหามาถึง :)</h3></center>";
        $scope.data[ind] += '<center style="padding-bottom:30px;"><a href="javascript:void(0)" class="w3-dark-grey w3-button w3-hover-black w3-center-align" onclick="document.getElementById(\'id01\').style.display=\'block\'">กดติดตาม</a></center>';
    }

    privateContent = function(ind){
        $scope.data[ind] = "<center style='padding:30px;'><h3 class='elmContent'> ขอโทษด้วย :(</h3><h3 class='elmContent'>เนื้อหานี้ทางผู้จัดทำไม่ได้เปิดแบบสาธารณะ</h3></center>";
        if($scope.education.func[ind].unlock){
            $scope.data[ind] += "<center><h3 class='elmContent'> แต่คุณสามารถปลดล็อคได้ โดย ";
            if($scope.education.func[ind].unlockBy = 'follow'){
                $scope.data[ind] += "</h3></center>";
                $scope.data[ind] += '<center style="padding-bottom:30px;"><a href="javascript:void(0)" class="w3-dark-grey w3-button w3-hover-black w3-center-align" onclick="document.getElementById(\'id01\').style.display=\'block\'">กดติดตามผู้เขียน<i class="w3-padding-left fa fa-lock"></i></a></center>';
            }
        }
    }

    buyContent = function(ind){
        var price = $scope.education.func[ind].value;
        $scope.data[ind] = "<center style='padding:30px;'><i class='fa fa-lock fa-lg'></i><h3 class='elmContent'>เนื้อหานี้ทางผู้สร้างจำกัดให้แสดงเฉพาะผู้ซื้อเท่านั้น</h3><h3 class='elmContent'>ราคา "+price+"</h3></center>";
        $scope.data[ind] += '<center style="padding-bottom:30px;"><a href="javascript:void(0)" class="w3-dark-grey w3-button w3-hover-black w3-center-align" onclick="document.getElementById(\'id01\').style.display=\'block\'">ซื้อเลย !</a></center>';
    }

    createMoreContent = function(ind){
        var topic = $scope.education.func[ind].head;
        var content = $scope.education.func[ind].content;
        $scope.data[ind] = '<button class="btn btn-default btn-moreContent" type="button" data-toggle="collapse" data-target="#moreCon'+ ind +'" aria-expanded="false" aria-controls="collapseExample">'+topic+'</button>';
        $scope.data[ind] += '<div class="collapse" id="moreCon'+ind+'"><div class="well" style="background-color:white;margin:0px"> '+content+' </div></div>';
    }

    createPic = function(ind){
        var text = $scope.education.func[ind].value;
        $scope.data[ind] = "<img src='images/plearn/"+text+"' width = '300' class='elmContent'>";
    }

    createQuote = function(ind){
       var text = $scope.education.func[ind].value;
        $scope.data[ind] = "<h3 class='elmContent' style='opacity:0.8'><i>\" "+ text +" \"<i></h3>";
    }

    toCenter = function(ind){
        $scope.data[ind] = "<center class='elmContent'>"+ $scope.data[ind] +"</center>";
    }

    toRight = function(ind){
        $scope.data[ind] = "<div style='text-align : right' class='elmContent'>"+ $scope.data[ind] +"</div>";
    }

    $scope.con = function(){
        if(document.getElementById('test')!=null){
            document.getElementById('test').innerHTML = "asdasd";
            var myConfig = {"type":"line","series":[{"values":[20,40,25,50,15,45,33,34]},{"values":[5,30,21,18,59,50,28,33]},{"values":[30,5,18,21,33,41,29,15]} ] };
            zingchart.render({ 
                id : 'myChart', 
                data : myConfig, 
                height: "400px", 
                width: "400px" 
            });
        }
    }

    $scope.chooseCh = function chooseCh(ch,subCh){
        console.log(ch+"sadas");
        $scope.education = dummy[ch-1][subCh-1];
        console.log($scope.education);
        $scope.data = [];
        for(var i = 0 ; i < $scope.education.func.length ; i++){
            window[$scope.education.func[i].name](i);
            
            if($scope.education.func[i].position=='center'){
                toCenter(i);
            }else if($scope.education.func[i].position=='right'){
                toRight(i);
            }

        }
        
    }

    $scope.nextCh = function nextCh(){
        console.log($scope.chStatus);
        $scope.chStatus.status = true;
        $scope.chStatus.nowCh = $scope.education.nextCh;
        $scope.chStatus.nowSubCh = $scope.education.nextSubCh;
        console.log($scope.chStatus);
        $scope.chooseCh($scope.chStatus.nowCh,$scope.chStatus.nowSubCh)
    }

    $scope.prevCh = function prevCh(){
        console.log($scope.chStatus);
        --$scope.chStatus.nowSubCh;
        console.log($scope.chStatus);
        $scope.chooseCh($scope.chStatus.nowCh,$scope.chStatus.nowSubCh)
    }

    refresh = function(ch){
	    $http.get('/education/'+ch).success(function(response){
            $scope.loading = true;
            $scope.education = dummy;
            $scope.work = "";
            console.log(dummy);
	    });
	};

    $scope.myTrackingFunction = function(n){
        if(n===1){
            return n;
        }
    }

	refresh();
    

    $scope.addContact = function(){
    	console.log($scope.contact);
    	if($scope.contact._id){
    		$scope.warning = 
    			'<div class="alert alert-warning">'+
    			'<strong>Warning!</strong> Cant add old user.'+
  				'</div>';﻿
 
    		refresh();
    	}else{
	    	$http.post('/contactlist', $scope.contact).success(function(response){
	    		console.log(response);
	    		$scope.warning = 
    			'<div class="alert alert-success">'+
    			'<strong>Success!</strong> Data added.'+
  				'</div>';﻿
	    		refresh();
	    	});
	    }
    };

    $scope.remove = function(id){
    	console.log(id);
    	$http.delete('/contactlist/'+id).success(function(response){
    		$scope.warning = 
    			'<div class="alert alert-success">'+
    			'<strong>Success!</strong> Data removed.'+
  				'</div>';﻿
    		refresh();
    	});
    }

    $scope.edit = function(id){
    	console.log(id);
    	$http.get('/contactlist/'+id).success(function(response){
    		$scope.contact = response;
    	});
    }

    $scope.update = function(){
    	if($scope.contact._id){
	    	console.log($scope.contact._id);
	    	$http.put('/contactlist/'+$scope.contact._id,$scope.contact).success(function(response){
	    		$scope.warning = 
    			'<div class="alert alert-success">'+
    			'<strong>Success!</strong> Data updated.'+
  				'</div>';﻿
	    		refresh();
	    	})
	    }else{
	    	$scope.warning = 
    			'<div class="alert alert-warning">'+
    			'<strong>Warning!</strong> Cant update new user.'+
  				'</div>';﻿
 
    		refresh();
	    }
    }
}])