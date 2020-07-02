
import { Component, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Platform, NavController, ModalController, ActionSheetController, AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AppMinimize } from '@ionic-native/app-minimize/ngx';
import { Subscription } from 'rxjs';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { element } from 'protractor';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { async } from '@angular/core/testing';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { HttpServiceService } from 'src/app/shared/services/http-service.service';

// import { ServicesService } from './services.service'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  providers: [AppMinimize]
})

export class AppComponent {
  sideMenuDisabled = true;
  backButtonPressed: boolean = false; //用于判断是否退出
  customBackActionSubscription: Subscription;
  url: any = '/lesson-tabs';//初始界面的url
  private keyValue: any = false;//判断是否返回上一界面
  public interval: any;

  constructor(
    private platform: Platform,
    private router: Router,
    public navController: NavController,//导航控制器
    public toast: ToastController,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private backgroundMode: BackgroundMode,
    private keyboard: Keyboard,
    public modalCtrl: ModalController,
    public actionSheetCtrl: ActionSheetController,
    private alertController: AlertController,
    public httpService: HttpServiceService,

    // public serve: ServicesService
  )
  //上方所有注入 请自行搜索注入
  {
    // this.keyboardEvent();
    this.initializeApp();
    // this.initRouterListen();
  }

  /**
   * 重写物理返回键
   */
  @HostListener('document:ionBackButton', ['$event'])
  private overrideHardwareBackAction($event: any) {
    $event.detail.register(100, async () => {
      //关闭键盘
      try {
        if (this.keyValue) {
          this.keyValue = false;
          return;
        }
      } catch (error) {
        console.log(error);
      }

      //关闭action sheet
      try {
        const element = await this.actionSheetCtrl.getTop();
        if (element) { element.dismiss(); return; }
      } catch (error) {
        console.log(error);
      }

      //关闭modal
      try {
        const element = await this.modalCtrl.getTop();
        if (element) { element.dismiss(); return; }
      } catch (error) {
        console.log(error);
      }

      if (this.router.url === '/lesson-tabs'
      || this.router.url === '/lesson-tabs/mylesson'
        || this.router.url === '/lesson-tabs/mylesson?flush=1'
        || this.router.url === '/lesson-tabs/mylesson?success=1'
        || this.router.url === '/lesson-tabs/mylesson?delete=1'
        || this.router.url === '/lesson-tabs/mylesson?join=1'
        || this.router.url === '/lesson-tabs/user-inf'
      ) {//判断是否是初始界面
        if (this.backButtonPressed) {
          navigator['app'].exitApp();
          this.backButtonPressed = false;//退出
        } else {
          const toast = await this.toast.create({
            message: '再按一次退出应用',
            duration: 2000
          });
          toast.present();
          this.backButtonPressed = true;
          setTimeout(() => this.backButtonPressed = false, 2000);//延时器改变退出判断属性
        }
      } else if (this.router.url === '/click') {
        //确认是否要结束签到
        const alert = await this.alertController.create({
          header: '提示',
          message: '是否结束签到？',
          buttons: [
            {
              text: '取消',
              role: 'cancel',
              cssClass: 'medium'
            }, {
              text: '确认',
              handler: async () => {
                var params = {
                  attend_id: localStorage.getItem("attend_id"),
                  type: 1
                }
                var api = '/attendence';//后台接口
                this.httpService.delete(api, params).then(async (response: any) => {
                  console.log(response.data)
                  clearInterval(this.interval)
                  // this.router.navigateByUrl('checkin-result');
                  // this.router.navigateByUrl('checkin-result', { replaceUrl: true });
                  this.router.navigate(['/checkin-result'], { 
                    queryParams:{ interval: '1' } 
                  });

                })
              }
            }
          ]
        });
        await alert.present();
      }
      // else if(this.router.url === '/checkin-result'){
      //   this.router.navigate(['/lesson-tabs/mylesson'], {queryParams: {success: '1'}});
      // }
      else if (this.router.url === '/create-success') {
        // this.router.navigateByUrl('lesson-tabs/mylesson', { replaceUrl: true });
        this.router.navigate(['/lesson-tabs/mylesson'], { queryParams: { success: '1' } });
      } else if (this.router.url === '/tabs/member') {
        this.router.navigateByUrl('lesson-tabs/mylesson', { replaceUrl: true });
      } else if (this.router.url === '/tabs/detail') {
        this.router.navigateByUrl('lesson-tabs/mylesson', { replaceUrl: true });
      } else {
        this.navController.back();//返回上一界面
      }
    })
  }

  // registerBackButtonAction() {
  //   let that = this;
  //   //有监听到键盘 但是会返回到前一页
  //   this.platform.backButton.subscribe(async () => {
  //     console.log(this.router.url);
  //     // return;
  //     // console.log(that.keyValue);
  //     // if (that.keyValue) {
  //     //   that.keyValue = false;//触发返回键操作，当为true时不返回上一界面
  //     //   return;
  //     // }
  //     // if (this.serve.get("scan")) { this.serve.set("scan", false); return; }//此处为服务传值
  //     if (that.url === '/lesson-tabs'
  //     ||that.url === '/lesson-tabs/mylesson'
  //     ||that.url === '/lesson-tabs/user-inf'
  //     ||that.url === '/') {//判断是否是初始界面
  //       if (that.backButtonPressed) {
  //         navigator['app'].exitApp();
  //         that.backButtonPressed = false;//退出
  //       } else {
  //         const toast = await this.toast.create({
  //           message: '再按一次退出应用',
  //           duration: 2000
  //         });
  //         toast.present();
  //         that.backButtonPressed = true;
  //         setTimeout(() => that.backButtonPressed = false, 2000);//延时器改变退出判断属性
  //       }
  //     } else {
  //       that.navController.back();//返回上一界面
  //     }
  //   });
  // }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.overlaysWebView(true);
      // this.statusBar.backgroundColorByHexString('#fff'); //状态栏的样式设置
      // this.statusBar.backgroundColorByHexString('#ffffff'); //状态栏的样式设置
      //       this.splashScreen.hide();
      // this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.keyboardEvent();
      this.platform.resume.subscribe();//弹出框
    });
  }
  keyboardEvent() {//键盘触发
    //键盘事件即将隐藏
    this.keyboard.onKeyboardWillHide().subscribe(async data => {
      setTimeout(() => {
        this.keyValue = false;
      }, 500);
    })
    this.keyboard.onKeyboardWillShow().subscribe(async data => {
      this.keyValue = true;
    });
  }
  // initRouterListen() {
  //   this.router.events.subscribe(event => { // 需要放到最后一个执行获取当前界面的url
  //     if (event instanceof NavigationEnd) {
  //       this.url = event.url;
  //     }
  //   });
  // }
}