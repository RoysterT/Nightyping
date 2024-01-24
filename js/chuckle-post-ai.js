<script data-pjax defer>
  new ChucklePostAI({
    el: '#post>#article-container', // 文章内容所在的元素属性的选择器，也是AI挂载的容器，AI将会挂载到该容器的最前面
    key: 'd463ce12f53cc3802f76', // 驱动AI所必须的key，即是tianliGPT后端服务所必须的key
    rec_method: 'web', // 文章推荐方式，all：匹配数据库内所有文章进行推荐，web：仅当前站内的文章，默认all
    title_el: '.post-title', // 指定标题el
    eliminate: ['29a5830','d98ef1d2'], // 让指定页面、文章不显示摘要AI
    summary_directly: true,	// 摘要AI挂载后直接请求并显示摘要
    hide_shuttle: true, // 隐藏矩阵穿梭按钮
    pjax: true, // 适配PJAX
    summary_toggle: false, // 允许生成多个简介
    summary_num: 1,  // 生成数量
    total_length: 1000, // 摘要最大长度
    ratio_string: "5:3:2", // 摘要前中后截取比例
    summary_speech: true, // 摘要语音朗读
    typewriter: true, // 控制打字机效果
    interface:{
      name: "Nightyping-AI",
      introduce: "我是Nightyping的AI文章助手，可以帮你总结文章内容，推荐相关的文章，点击下方的按钮与我互动吧！", // 自我介绍
      version: "GPT-4", // 右上角GPT版本文字
      button: ["介绍自己", "推荐相关文章", "生成AI简介", "矩阵穿梭"] // 四个按钮文本
		}
	})
</script>