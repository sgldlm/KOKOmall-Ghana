const App = (function () {
    const S = { val: 0, pts: 0, ord: 0, favs: [], u: null, sel: new Set(), ptsSel: new Set(), favSel: new Set(), rec: { l: [], o: [], p: [], r: [] }, activeItem: null, unit: 10, gridSize: 64, searchHist: [], address: null, location: { lat: null, lng: null, address: null }, selectedPaymentMethod: null };
    const PD = [
        // 48 tier (10 items)
        { id: "p1", n: "钥匙扣", p: 48, i: "fa-key" },
        { id: "p2", n: "手机贴纸", p: 48, i: "fa-sticky-note" },
        { id: "p3", n: "手机壳", p: 48, i: "fa-shield-alt" },
        { id: "p4", n: "书签", p: 48, i: "fa-bookmark" },
        { id: "p5", n: "徽章", p: 48, i: "fa-star" },
        { id: "p6", n: "贴纸套装", p: 48, i: "fa-icons" },
        { id: "p7", n: "小挂件", p: 48, i: "fa-gem" },
        { id: "p8", n: "手机支架", p: 48, i: "fa-mobile" },
        { id: "p9", n: "卡套", p: 48, i: "fa-credit-card" },
        { id: "p10", n: "便签本", p: 48, i: "fa-sticky-note" },
        // 148 tier (10 items)
        { id: "p11", n: "公仔", p: 148, i: "fa-dragon" },
        { id: "p12", n: "日用百货", p: 148, i: "fa-utensils" },
        { id: "p13", n: "笔记本", p: 148, i: "fa-book" },
        { id: "p14", n: "水杯", p: 148, i: "fa-mug-hot" },
        { id: "p15", n: "雨伞", p: 148, i: "fa-umbrella" },
        { id: "p16", n: "帆布袋", p: 148, i: "fa-shopping-bag" },
        { id: "p17", n: "钢笔", p: 148, i: "fa-pen" },
        { id: "p18", n: "手账本", p: 148, i: "fa-book-open" },
        { id: "p19", n: "小夜灯", p: 148, i: "fa-lightbulb" },
        { id: "p20", n: "收纳盒", p: 148, i: "fa-box" },
        // 248 tier (10 items)
        { id: "p21", n: "时尚单品", p: 248, i: "fa-socks" },
        { id: "p22", n: "鼠标", p: 248, i: "fa-mouse" },
        { id: "p23", n: "露营灯", p: 248, i: "fa-lightbulb" },
        { id: "p24", n: "保温杯", p: 248, i: "fa-coffee" },
        { id: "p25", n: "蓝牙音箱", p: 248, i: "fa-volume-up" },
        { id: "p26", n: "数据线", p: 248, i: "fa-plug" },
        { id: "p27", n: "充电器", p: 248, i: "fa-charging-station" },
        { id: "p28", n: "耳机", p: 248, i: "fa-headphones" },
        { id: "p29", n: "手机壳高级版", p: 248, i: "fa-shield-alt" },
        { id: "p30", n: "桌面摆件", p: 248, i: "fa-chess-knight" },
        // 348 tier (15 items)
        { id: "p31", n: "数码产品", p: 348, i: "fa-mobile-alt" },
        { id: "p32", n: "公仔", p: 348, i: "fa-dragon" },
        { id: "p33", n: "新品潮玩", p: 348, i: "fa-ghost" },
        { id: "p34", n: "智能手环", p: 348, i: "fa-watch" },
        { id: "p35", n: "运动手表", p: 348, i: "fa-stopwatch" },
        { id: "p36", n: "蓝牙耳机", p: 348, i: "fa-headphones" },
        { id: "p37", n: "移动电源", p: 348, i: "fa-battery-three-quarters" },
        { id: "p38", n: "键盘", p: 348, i: "fa-keyboard" },
        { id: "p39", n: "鼠标垫", p: 348, i: "fa-square" },
        { id: "p40", n: "网络摄像头", p: 348, i: "fa-video" },
        { id: "p41", n: "麦克风", p: 348, i: "fa-microphone" },
        { id: "p42", n: "U盘", p: 348, i: "fa-usb" },
        { id: "p43", n: "读卡器", p: 348, i: "fa-sd-card" },
        { id: "p44", n: "手机支架高级版", p: 348, i: "fa-mobile-alt" },
        { id: "p45", n: "车载支架", p: 348, i: "fa-car" },
        // 448 tier (15 items)
        { id: "p46", n: "便携音箱", p: 448, i: "fa-broadcast-tower" },
        { id: "p47", n: "旅行包", p: 448, i: "fa-suitcase" },
        { id: "p48", n: "运动水壶", p: 448, i: "fa-tint" },
        { id: "p49", n: "智能手表", p: 448, i: "fa-clock" },
        { id: "p50", n: "运动耳机", p: 448, i: "fa-headphones" },
        { id: "p51", n: "充电宝", p: 448, i: "fa-battery-full" },
        { id: "p52", n: "蓝牙键盘", p: 448, i: "fa-keyboard" },
        { id: "p53", n: "无线鼠标", p: 448, i: "fa-mouse" },
        { id: "p54", n: "游戏手柄", p: 448, i: "fa-gamepad" },
        { id: "p55", n: "台灯", p: 448, i: "fa-lightbulb" },
        { id: "p56", n: "加湿器", p: 448, i: "fa-water" },
        { id: "p57", n: "小风扇", p: 448, i: "fa-fan" },
        { id: "p58", n: "暖手宝", p: 448, i: "fa-fire" },
        { id: "p59", n: "按摩仪", p: 448, i: "fa-hand-sparkles" },
        { id: "p60", n: "美容仪", p: 448, i: "fa-spa" },
        // 548 tier (19 items)
        { id: "p61", n: "数码产品", p: 548, i: "fa-laptop" },
        { id: "p62", n: "美妆", p: 548, i: "fa-magic" },
        { id: "p63", n: "公仔", p: 548, i: "fa-dragon" },
        { id: "p64", n: "平板电脑", p: 548, i: "fa-tablet" },
        { id: "p65", n: "电子书阅读器", p: 548, i: "fa-book-reader" },
        { id: "p66", n: "智能音箱", p: 548, i: "fa-volume-up" },
        { id: "p67", n: "投影仪", p: 548, i: "fa-video" },
        { id: "p68", n: "显示器", p: 548, i: "fa-desktop" },
        { id: "p69", n: "机械键盘", p: 548, i: "fa-keyboard" },
        { id: "p70", n: "游戏耳机", p: 548, i: "fa-headphones" },
        { id: "p71", n: "专业相机", p: 548, i: "fa-camera" },
        { id: "p72", n: "运动相机", p: 548, i: "fa-video" },
        { id: "p73", n: "无人机", p: 548, i: "fa-helicopter" },
        { id: "p74", n: "VR眼镜", p: 548, i: "fa-vr-cardboard" },
        { id: "p75", n: "扫地机器人", p: 548, i: "fa-robot" },
        { id: "p76", n: "空气净化器", p: 548, i: "fa-wind" },
        { id: "p77", n: "咖啡机", p: 548, i: "fa-coffee" },
        { id: "p78", n: "电动牙刷", p: 548, i: "fa-tooth" },
        { id: "p79", n: "剃须刀", p: 548, i: "fa-cut" },
        { id: "p80", n: "吹风机", p: 548, i: "fa-wind" },
        { id: "p81", n: "卷发棒", p: 548, i: "fa-magic" },
        { id: "p82", n: "电竞椅", p: 548, i: "fa-chair" },
        { id: "p83", n: "办公椅", p: 548, i: "fa-chair" },
        { id: "p84", n: "书架", p: 548, i: "fa-book" },
        { id: "p85", n: "收纳柜", p: 548, i: "fa-archive" },
        { id: "p86", n: "落地灯", p: 548, i: "fa-lightbulb" },
        { id: "p87", n: "挂钟", p: 548, i: "fa-clock" },
        { id: "p88", n: "相框", p: 548, i: "fa-image" },
        { id: "p89", n: "装饰画", p: 548, i: "fa-palette" },
        // 688 tier (3 items)
        { id: "p90", n: "智能手环Pro", p: 688, i: "fa-watch" },
        { id: "p91", n: "蓝牙音箱Pro", p: 688, i: "fa-volume-up" },
        { id: "p92", n: "无线充电板", p: 688, i: "fa-charging-station" },
        // 788 tier (3 items)
        { id: "p93", n: "机械键盘RGB", p: 788, i: "fa-keyboard" },
        { id: "p94", n: "游戏鼠标", p: 788, i: "fa-mouse" },
        { id: "p95", n: "电竞耳机", p: 788, i: "fa-headphones" },
        // 888 tier (3 items)
        { id: "p96", n: "智能台灯", p: 888, i: "fa-lightbulb" },
        { id: "p97", n: "便携投影仪", p: 888, i: "fa-video" },
        { id: "p98", n: "迷你音箱", p: 888, i: "fa-music" },
        // 988 tier (3 items)
        { id: "p99", n: "运动手表Pro", p: 988, i: "fa-stopwatch" },
        { id: "p100", n: "智能体重秤", p: 988, i: "fa-weight" },
        { id: "p101", n: "筋膜枪", p: 988, i: "fa-bolt" },
        // 1088 tier (3 items)
        { id: "p102", n: "电动牙刷Pro", p: 1088, i: "fa-tooth" },
        { id: "p103", n: "美容仪Pro", p: 1088, i: "fa-spa" },
        { id: "p104", n: "按摩仪Pro", p: 1088, i: "fa-hand-sparkles" },
        // 1288 tier (3 items)
        { id: "p105", n: "平板电脑Pro", p: 1288, i: "fa-tablet-alt" },
        { id: "p106", n: "智能手表Ultra", p: 1288, i: "fa-clock" },
        { id: "p107", n: "降噪耳机", p: 1288, i: "fa-headphones-alt" },
        // 1588 tier (3 items)
        { id: "p108", n: "无人机Mini", p: 1588, i: "fa-helicopter" },
        { id: "p109", n: "运动相机Pro", p: 1588, i: "fa-video" },
        { id: "p110", n: "智能音箱Pro", p: 1588, i: "fa-volume-up" },
        // 1699 tier (2 items)
        { id: "p111", n: "电子书阅读器Pro", p: 1699, i: "fa-book-reader" },
        { id: "p112", n: "便携显示器", p: 1699, i: "fa-desktop" },
        // 2099 tier (3 items)
        { id: "p113", n: "游戏手柄Pro", p: 2099, i: "fa-gamepad" },
        { id: "p114", n: "机械键盘旗舰版", p: 2099, i: "fa-keyboard" },
        { id: "p115", n: "专业麦克风", p: 2099, i: "fa-microphone" },
        // 2288 tier (3 items)
        { id: "p116", n: "扫地机器人Pro", p: 2288, i: "fa-robot" },
        { id: "p117", n: "空气净化器Pro", p: 2288, i: "fa-wind" },
        { id: "p118", n: "智能咖啡机", p: 2288, i: "fa-coffee" },
        // 3388 tier (3 items)
        { id: "p119", n: "专业相机套装", p: 3388, i: "fa-camera" },
        { id: "p120", n: "VR眼镜Pro", p: 3388, i: "fa-vr-cardboard" },
        { id: "p121", n: "投影仪4K", p: 3388, i: "fa-video" },
        // 3688 tier (2 items)
        { id: "p122", n: "无人机Pro", p: 3688, i: "fa-helicopter" },
        { id: "p123", n: "专业显示器", p: 3688, i: "fa-desktop" },
        // 4088 tier (2 items)
        { id: "p124", n: "游戏笔记本", p: 4088, i: "fa-laptop" },
        { id: "p125", n: "电竞椅旗舰版", p: 4088, i: "fa-chair" },
        // 4688 tier (3 items)
        { id: "p126", n: "单反相机", p: 4688, i: "fa-camera-retro" },
        { id: "p127", n: "专业投影仪", p: 4688, i: "fa-video" },
        { id: "p128", n: "高端音响", p: 4688, i: "fa-volume-up" },
        // 5288 tier (6 items)
        { id: "p129", n: "笔记本电脑Pro", p: 5288, i: "fa-laptop" },
        { id: "p130", n: "专业相机旗舰版", p: 5288, i: "fa-camera" },
        { id: "p131", n: "无人机旗舰版", p: 5288, i: "fa-helicopter" },
        { id: "p132", n: "智能按摩椅", p: 5288, i: "fa-couch" },
        { id: "p133", n: "高端投影仪", p: 5288, i: "fa-video" },
        { id: "p134", n: "专业音频设备", p: 5288, i: "fa-broadcast-tower" },
        // 5288 tier (52 additional items)
        { id: "p135", n: "游戏笔记本旗舰版", p: 5288, i: "fa-laptop" },
        { id: "p136", n: "4K专业显示器", p: 5288, i: "fa-desktop" },
        { id: "p137", n: "8K摄像机", p: 5288, i: "fa-video" },
        { id: "p138", n: "专业混音设备", p: 5288, i: "fa-microphone" },
        { id: "p139", n: "高端音响系统", p: 5288, i: "fa-volume-up" },
        { id: "p140", n: "智能家居套装", p: 5288, i: "fa-home" },
        { id: "p141", n: "无线充电系统", p: 5288, i: "fa-charging-station" },
        { id: "p142", n: "专业录音棚设备", p: 5288, i: "fa-microphone-alt" },
        { id: "p143", n: "游戏显卡RTX4090", p: 5288, i: "fa-memory" },
        { id: "p144", n: "高性能CPU套装", p: 5288, i: "fa-processor" },
        { id: "p145", n: "极限散热方案", p: 5288, i: "fa-fan" },
        { id: "p146", n: "电竞网吧级主机", p: 5288, i: "fa-desktop" },
        { id: "p147", n: "VR设备完整套装", p: 5288, i: "fa-vr-cardboard" },
        { id: "p148", n: "AR眼镜", p: 5288, i: "fa-glasses" },
        { id: "p149", n: "全息投影仪", p: 5288, i: "fa-video" },
        { id: "p150", n: "激光投影机", p: 5288, i: "fa-lightbulb" },
        { id: "p151", n: "IMAX影院投影", p: 5288, i: "fa-film" },
        { id: "p152", n: "智能家庭影院", p: 5288, i: "fa-tv" },
        { id: "p153", n: "超声波清洁器", p: 5288, i: "fa-droplet" },
        { id: "p154", n: "氧吧机", p: 5288, i: "fa-wind" },
        { id: "p155", n: "中央空调系统", p: 5288, i: "fa-snowflake" },
        { id: "p156", n: "热水系统", p: 5288, i: "fa-fire" },
        { id: "p157", n: "新风系统", p: 5288, i: "fa-fan" },
        { id: "p158", n: "智能门锁系统", p: 5288, i: "fa-lock" },
        { id: "p159", n: "安防监控系统", p: 5288, i: "fa-camera-security" },
        { id: "p160", n: "智能照明系统", p: 5288, i: "fa-lightbulb" },
        { id: "p161", n: "健身房器材套装", p: 5288, i: "fa-dumbbell" },
        { id: "p162", n: "跑步机高端款", p: 5288, i: "fa-running" },
        { id: "p163", n: "划船机专业版", p: 5288, i: "fa-water" },
        { id: "p164", n: "动感单车系统", p: 5288, i: "fa-bicycle" },
        { id: "p165", n: "瑜伽垫豪华版", p: 5288, i: "fa-rug" },
        { id: "p166", n: "椭圆机", p: 5288, i: "fa-ellipsis-h" },
        { id: "p167", n: "综合训练器材", p: 5288, i: "fa-square-full" },
        { id: "p168", n: "力量架系统", p: 5288, i: "fa-cube" },
        { id: "p169", n: "龙门架", p: 5288, i: "fa-gopuram" },
        { id: "p170", n: "杠铃片套装", p: 5288, i: "fa-weighing-scale" },
        { id: "p171", n: "哑铃套装", p: 5288, i: "fa-weight" },
        { id: "p172", n: "壶铃套装", p: 5288, i: "fa-spa" },
        { id: "p173", n: "健身球", p: 5288, i: "fa-futbol" },
        { id: "p174", n: "跳绳专业版", p: 5288, i: "fa-rope" },
        { id: "p175", n: "弹力带套装", p: 5288, i: "fa-wave-square" },
        { id: "p176", n: "瑜伽轮", p: 5288, i: "fa-circle" },
        { id: "p177", n: "按摩枪旗舰版", p: 5288, i: "fa-bolt" },
        { id: "p178", n: "筋膜枪专业版", p: 5288, i: "fa-hammer" },
        { id: "p179", n: "智能跳绳", p: 5288, i: "fa-ring" },
        { id: "p180", n: "高端冷冻设备", p: 5288, i: "fa-snowflake" },
        { id: "p181", n: "专业厨房设备", p: 5288, i: "fa-utensils" },
        { id: "p182", n: "破壁机豪华版", p: 5288, i: "fa-blender" },
        { id: "p183", n: "烤箱专业版", p: 5288, i: "fa-toaster" },
        { id: "p184", n: "咖啡机旗舰版", p: 5288, i: "fa-coffee" },
        { id: "p185", n: "智能冰箱", p: 5288, i: "fa-snowflake" },
        { id: "p186", n: "洗碗机", p: 5288, i: "fa-soap" },
        { id: "p187", n: "洗衣机豪华版", p: 5288, i: "fa-drum" },
        { id: "p188", n: "烘干机专业版", p: 5288, i: "fa-wind" },
        // 新增30组产品
        { id: "p189", n: "智能扫地机器人", p: 1888, i: "fa-robot" },
        { id: "p190", n: "无线充电板", p: 288, i: "fa-charging-station" },
        { id: "p191", n: "智能门铃", p: 588, i: "fa-bell" },
        { id: "p192", n: "智能灯泡套装", p: 388, i: "fa-lightbulb" },
        { id: "p193", n: "智能插座", p: 188, i: "fa-plug" },
        { id: "p194", n: "智能窗帘", p: 1288, i: "fa-window-maximize" },
        { id: "p195", n: "智能体重秤", p: 288, i: "fa-weight" },
        { id: "p196", n: "智能空气净化器", p: 1688, i: "fa-wind" },
        { id: "p197", n: "智能加湿器", p: 488, i: "fa-tint" },
        { id: "p198", n: "智能电饭煲", p: 688, i: "fa-utensils" },
        { id: "p199", n: "智能烤箱", p: 1288, i: "fa-fire" },
        { id: "p200", n: "智能热水壶", p: 388, i: "fa-mug-hot" },
        { id: "p201", n: "智能手环Pro", p: 488, i: "fa-watch" },
        { id: "p202", n: "智能眼镜", p: 2888, i: "fa-glasses" },
        { id: "p203", n: "智能手表", p: 1888, i: "fa-clock" },
        { id: "p204", n: "智能跑步机", p: 3688, i: "fa-running" },
        { id: "p205", n: "智能动感单车", p: 2288, i: "fa-bicycle" },
        { id: "p206", n: "智能划船机", p: 2888, i: "fa-water" },
        { id: "p207", n: "智能椭圆机", p: 2688, i: "fa-ellipsis-h" },
        { id: "p208", n: "智能按摩椅", p: 4888, i: "fa-couch" },
        { id: "p209", n: "智能筋膜枪", p: 588, i: "fa-hammer" },
        { id: "p210", n: "智能体脂秤", p: 388, i: "fa-weight-hanging" },
        { id: "p211", n: "智能跳绳", p: 188, i: "fa-ring" },
        { id: "p212", n: "智能瑜伽垫", p: 288, i: "fa-rug" },
        { id: "p213", n: "智能健身镜", p: 3888, i: "fa-mirror" },
        { id: "p214", n: "智能音响Pro", p: 1888, i: "fa-volume-up" },
        { id: "p215", n: "智能投影仪", p: 2888, i: "fa-video" },
        { id: "p216", n: "智能电视", p: 3888, i: "fa-tv" },
        { id: "p217", n: "智能冰箱", p: 4888, i: "fa-snowflake" },
        { id: "p218", n: "智能洗衣机", p: 3688, i: "fa-drum" },
        // 再增加60组产品
        { id: "p219", n: "无线鼠标Pro", p: 288, i: "fa-mouse" },
        { id: "p220", n: "机械键盘", p: 688, i: "fa-keyboard" },
        { id: "p221", n: "游戏鼠标垫", p: 188, i: "fa-square" },
        { id: "p222", n: "电竞显示器", p: 2888, i: "fa-desktop" },
        { id: "p223", n: "游戏手柄", p: 488, i: "fa-gamepad" },
        { id: "p224", n: "VR头显设备", p: 3888, i: "fa-vr-cardboard" },
        { id: "p225", n: "AR智能眼镜", p: 4888, i: "fa-glasses" },
        { id: "p226", n: "3D打印机", p: 3688, i: "fa-print" },
        { id: "p227", n: "激光雕刻机", p: 2888, i: "fa-laser-pointer" },
        { id: "p228", n: "无人机航拍版", p: 4888, i: "fa-helicopter" },
        { id: "p229", n: "运动相机", p: 1888, i: "fa-camera" },
        { id: "p230", n: "单反相机", p: 5888, i: "fa-camera-retro" },
        { id: "p231", n: "微单相机", p: 4888, i: "fa-camera" },
        { id: "p232", n: "镜头套装", p: 6888, i: "fa-camera" },
        { id: "p233", n: "三脚架专业版", p: 888, i: "fa-tripod" },
        { id: "p234", n: "稳定器", p: 1288, i: "fa-balance-scale" },
        { id: "p235", n: "录音笔", p: 688, i: "fa-microphone" },
        { id: "p236", n: "专业麦克风", p: 1888, i: "fa-microphone-alt" },
        { id: "p237", n: "调音台", p: 3888, i: "fa-sliders-h" },
        { id: "p238", n: "监听音箱", p: 2888, i: "fa-volume-up" },
        { id: "p239", n: "降噪耳机", p: 1888, i: "fa-headphones" },
        { id: "p240", n: "真无线耳机", p: 888, i: "fa-headphones" },
        { id: "p241", n: "头戴式耳机", p: 1288, i: "fa-headphones-alt" },
        { id: "p242", n: "蓝牙音箱", p: 588, i: "fa-volume-up" },
        { id: "p243", n: "智能音箱", p: 688, i: "fa-volume-up" },
        { id: "p244", n: "家庭影院系统", p: 8888, i: "fa-tv" },
        { id: "p245", n: "4K蓝光播放器", p: 1888, i: "fa-play-circle" },
        { id: "p246", n: "NAS网络存储", p: 2888, i: "fa-server" },
        { id: "p247", n: "路由器旗舰版", p: 888, i: "fa-wifi" },
        { id: "p248", n: "网络交换机", p: 1888, i: "fa-network-wired" },
        { id: "p249", n: "智能门锁", p: 1888, i: "fa-lock" },
        { id: "p250", n: "智能摄像头", p: 688, i: "fa-camera-security" },
        { id: "p251", n: "智能烟雾报警器", p: 388, i: "fa-fire-extinguisher" },
        { id: "p252", n: "智能水浸传感器", p: 288, i: "fa-tint" },
        { id: "p253", n: "智能燃气报警器", p: 388, i: "fa-fire" },
        { id: "p254", n: "智能窗帘电机", p: 1888, i: "fa-window-maximize" },
        { id: "p255", n: "智能晾衣架", p: 1288, i: "fa-tshirt" },
        { id: "p256", n: "智能马桶盖", p: 2888, i: "fa-toilet" },
        { id: "p257", n: "智能花盆", p: 388, i: "fa-seedling" },
        { id: "p258", n: "智能鱼缸", p: 1888, i: "fa-fish" },
        { id: "p259", n: "智能宠物喂食器", p: 888, i: "fa-bowl-food" },
        { id: "p260", n: "智能猫砂盆", p: 1888, i: "fa-cat" },
        { id: "p261", n: "智能婴儿监护器", p: 1288, i: "fa-baby" },
        { id: "p262", n: "智能儿童手表", p: 688, i: "fa-watch" },
        { id: "p263", n: "智能学习机", p: 2888, i: "fa-laptop" },
        { id: "p264", n: "电子阅读器", p: 1288, i: "fa-book-reader" },
        { id: "p265", n: "平板电脑", p: 2888, i: "fa-tablet-alt" },
        { id: "p266", n: "二合一笔记本", p: 4888, i: "fa-laptop" },
        { id: "p267", n: "游戏本", p: 6888, i: "fa-laptop" },
        { id: "p268", n: "工作站电脑", p: 8888, i: "fa-desktop" },
        { id: "p269", n: "一体机电脑", p: 4888, i: "fa-desktop" },
        { id: "p270", n: "迷你主机", p: 2888, i: "fa-server" },
        { id: "p271", n: "显卡RTX4090", p: 12888, i: "fa-memory" },
        { id: "p272", n: "CPU处理器", p: 4888, i: "fa-microchip" },
        { id: "p273", n: "内存条32GB", p: 1888, i: "fa-memory" },
        { id: "p274", n: "SSD固态硬盘2TB", p: 1888, i: "fa-hdd" },
        { id: "p275", n: "机械硬盘4TB", p: 888, i: "fa-hdd" },
        { id: "p276", n: "电源1000W", p: 1288, i: "fa-plug" },
        { id: "p277", n: "水冷散热器", p: 888, i: "fa-fan" },
        { id: "p278", n: "机箱RGB版", p: 688, i: "fa-box" },
        // 688 tier (10 additional items)
        { id: "p279", n: "智能门锁", p: 688, i: "fa-lock" },
        { id: "p280", n: "智能门铃", p: 688, i: "fa-bell" },
        { id: "p281", n: "智能插座", p: 688, i: "fa-plug" },
        { id: "p282", n: "智能开关", p: 688, i: "fa-toggle-on" },
        { id: "p283", n: "温湿度传感器", p: 688, i: "fa-thermometer-half" },
        { id: "p284", n: "智能窗帘", p: 688, i: "fa-window-maximize" },
        { id: "p285", n: "智能灯泡", p: 688, i: "fa-lightbulb" },
        { id: "p286", n: "智能摄像头", p: 688, i: "fa-video" },
        { id: "p287", n: "智能音箱Mini", p: 688, i: "fa-volume-down" },
        { id: "p288", n: "智能遥控器", p: 688, i: "fa-tv" },
        // 688积分 tier (30 items)
        { id: "p289", n: "智能门锁Pro", p: 688, i: "fa-lock" },
        { id: "p290", n: "智能门铃Pro", p: 688, i: "fa-bell" },
        { id: "p291", n: "智能插座Pro", p: 688, i: "fa-plug" },
        { id: "p292", n: "智能开关Pro", p: 688, i: "fa-toggle-on" },
        { id: "p293", n: "温湿度传感器Pro", p: 688, i: "fa-thermometer-half" },
        { id: "p294", n: "智能窗帘Pro", p: 688, i: "fa-window-maximize" },
        { id: "p295", n: "智能灯泡Pro", p: 688, i: "fa-lightbulb" },
        { id: "p296", n: "智能摄像头Pro", p: 688, i: "fa-video" },
        { id: "p297", n: "智能音箱Pro", p: 688, i: "fa-volume-up" },
        { id: "p298", n: "智能遥控器Pro", p: 688, i: "fa-tv" },
        { id: "p299", n: "智能网关", p: 688, i: "fa-network-wired" },
        { id: "p300", n: "智能传感器", p: 688, i: "fa-sensor" },
        { id: "p301", n: "智能报警器", p: 688, i: "fa-shield-alt" },
        { id: "p302", n: "智能烟雾报警器", p: 688, i: "fa-fire" },
        { id: "p303", n: "智能水浸传感器", p: 688, i: "fa-tint" },
        { id: "p304", n: "智能人体传感器", p: 688, i: "fa-user" },
        { id: "p305", n: "智能光照传感器", p: 688, i: "fa-sun" },
        { id: "p306", n: "智能门窗传感器", p: 688, i: "fa-door-open" },
        { id: "p307", n: "智能震动传感器", p: 688, i: "fa-vibration" },
        { id: "p308", n: "智能红外传感器", p: 688, i: "fa-signal" },
        { id: "p309", n: "无线充电器", p: 688, i: "fa-charging-station" },
        { id: "p310", n: "快充充电器", p: 688, i: "fa-bolt" },
        { id: "p311", n: "车载充电器", p: 688, i: "fa-car" },
        { id: "p312", n: "移动电源Pro", p: 688, i: "fa-battery-full" },
        { id: "p313", n: "数据线套装", p: 688, i: "fa-plug" },
        { id: "p314", n: "Type-C转接头", p: 688, i: "fa-exchange-alt" },
        { id: "p315", n: "HDMI转接头", p: 688, i: "fa-hdmi" },
        { id: "p316", n: "USB扩展坞", p: 688, i: "fa-usb" },
        { id: "p317", n: "读卡器Pro", p: 688, i: "fa-sd-card" },
        { id: "p318", n: "U盘Pro", p: 688, i: "fa-usb" },
        // 888积分 tier (25 items)
        { id: "p319", n: "移动硬盘", p: 888, i: "fa-hdd" },
        { id: "p320", n: "外置光驱", p: 888, i: "fa-compact-disc" },
        { id: "p321", n: "蓝牙适配器", p: 888, i: "fa-bluetooth" },
        { id: "p322", n: "WiFi扩展器", p: 888, i: "fa-wifi" },
        { id: "p323", n: "网络交换机", p: 888, i: "fa-network-wired" },
        { id: "p324", n: "路由器Pro", p: 888, i: "fa-router" },
        { id: "p325", n: "NAS存储", p: 888, i: "fa-server" },
        { id: "p326", n: "网络摄像头Pro", p: 888, i: "fa-video" },
        { id: "p327", n: "监控摄像头", p: 888, i: "fa-camera" },
        { id: "p328", n: "行车记录仪", p: 888, i: "fa-car" },
        { id: "p329", n: "有线耳机", p: 888, i: "fa-headphones" },
        { id: "p330", n: "无线耳机", p: 888, i: "fa-headphones-alt" },
        { id: "p331", n: "降噪耳机Pro", p: 888, i: "fa-headphones" },
        { id: "p332", n: "游戏耳机Pro", p: 888, i: "fa-headphones" },
        { id: "p333", n: "运动耳机Pro", p: 888, i: "fa-headphones" },
        { id: "p334", n: "蓝牙耳机Pro", p: 888, i: "fa-headphones" },
        { id: "p335", n: "头戴式耳机", p: 888, i: "fa-headphones" },
        { id: "p336", n: "入耳式耳机", p: 888, i: "fa-headphones" },
        { id: "p337", n: "骨传导耳机", p: 888, i: "fa-headphones" },
        { id: "p338", n: "真无线耳机", p: 888, i: "fa-headphones" },
        { id: "p339", n: "音响系统", p: 888, i: "fa-volume-up" },
        { id: "p340", n: "回音壁", p: 888, i: "fa-tv" },
        { id: "p341", n: "低音炮", p: 888, i: "fa-volume-down" },
        { id: "p342", n: "功放器", p: 888, i: "fa-broadcast-tower" },
        { id: "p343", n: "调音台", p: 888, i: "fa-sliders-h" },
        // 1288积分 tier (25 items)
        { id: "p344", n: "麦克风Pro", p: 1288, i: "fa-microphone" },
        { id: "p345", n: "录音笔", p: 1288, i: "fa-microphone-alt" },
        { id: "p346", n: "对讲机", p: 1288, i: "fa-walkie-talkie" },
        { id: "p347", n: "扩音器", p: 1288, i: "fa-bullhorn" },
        { id: "p348", n: "音箱支架", p: 1288, i: "fa-music" },
        { id: "p349", n: "显示器支架", p: 1288, i: "fa-desktop" },
        { id: "p350", n: "键盘托架", p: 1288, i: "fa-keyboard" },
        { id: "p351", n: "鼠标垫Pro", p: 1288, i: "fa-mouse" },
        { id: "p352", n: "电脑包", p: 1288, i: "fa-briefcase" },
        { id: "p353", n: "笔记本支架", p: 1288, i: "fa-laptop" },
        { id: "p354", n: "散热器Pro", p: 1288, i: "fa-fan" },
        { id: "p355", n: "风扇Pro", p: 1288, i: "fa-wind" },
        { id: "p356", n: "机箱风扇", p: 1288, i: "fa-fan" },
        { id: "p357", n: "RGB灯条", p: 1288, i: "fa-lightbulb" },
        { id: "p358", n: "线缆管理", p: 1288, i: "fa-plug" },
        { id: "p359", n: "USB集线器", p: 1288, i: "fa-usb" },
        { id: "p360", n: "KVM切换器", p: 1288, i: "fa-exchange-alt" },
        { id: "p361", n: "视频采集卡", p: 1288, i: "fa-video" },
        { id: "p362", n: "声卡", p: 1288, i: "fa-microphone" },
        { id: "p363", n: "网卡", p: 1288, i: "fa-network-wired" },
        { id: "p364", n: "显卡支架", p: 1288, i: "fa-memory" },
        { id: "p365", n: "内存散热片", p: 1288, i: "fa-memory" },
        { id: "p366", n: "CPU散热器", p: 1288, i: "fa-microchip" },
        { id: "p367", n: "水冷系统", p: 1288, i: "fa-tint" },
        { id: "p368", n: "机箱侧板", p: 1288, i: "fa-box" },
        // 1888积分 tier (20 items)
        { id: "p369", n: "打印机", p: 1888, i: "fa-print" },
        { id: "p370", n: "扫描仪", p: 1888, i: "fa-scanner" },
        { id: "p371", n: "复印机", p: 1888, i: "fa-copy" },
        { id: "p372", n: "传真机", p: 1888, i: "fa-fax" },
        { id: "p373", n: "碎纸机", p: 1888, i: "fa-cut" },
        { id: "p374", n: "装订机", p: 1888, i: "fa-book" },
        { id: "p375", n: "打孔机", p: 1888, i: "fa-punch-card" },
        { id: "p376", n: "标签打印机", p: 1888, i: "fa-tag" },
        { id: "p377", n: "条码扫描器", p: 1888, i: "fa-barcode" },
        { id: "p378", n: "考勤机", p: 1888, i: "fa-clock" },
        { id: "p379", n: "投影幕布", p: 1888, i: "fa-tv" },
        { id: "p380", n: "白板", p: 1888, i: "fa-chalkboard" },
        { id: "p381", n: "黑板", p: 1888, i: "fa-chalkboard-teacher" },
        { id: "p382", n: "文件柜", p: 1888, i: "fa-archive" },
        { id: "p383", n: "办公桌", p: 1888, i: "fa-table" },
        { id: "p384", n: "办公椅", p: 1888, i: "fa-chair" },
        { id: "p385", n: "会议桌", p: 1888, i: "fa-table" },
        { id: "p386", n: "会议椅", p: 1888, i: "fa-chair" },
        { id: "p387", n: "屏风", p: 1888, i: "fa-columns" },
        { id: "p388", n: "储物柜", p: 1888, i: "fa-archive" },
        // 2288积分 tier (20 items)
        { id: "p389", n: "电饭煲", p: 2288, i: "fa-utensils" },
        { id: "p390", n: "压力锅", p: 2288, i: "fa-fire" },
        { id: "p391", n: "空气炸锅", p: 2288, i: "fa-fire" },
        { id: "p392", n: "烤箱", p: 2288, i: "fa-fire" },
        { id: "p393", n: "微波炉", p: 2288, i: "fa-fire" },
        { id: "p394", n: "榨汁机", p: 2288, i: "fa-blender" },
        { id: "p395", n: "破壁机", p: 2288, i: "fa-blender-phone" },
        { id: "p396", n: "咖啡机Pro", p: 2288, i: "fa-coffee" },
        { id: "p397", n: "面包机", p: 2288, i: "fa-bread-slice" },
        { id: "p398", n: "酸奶机", p: 2288, i: "fa-cookie" },
        { id: "p399", n: "电水壶", p: 2288, i: "fa-mug-hot" },
        { id: "p400", n: "保温壶", p: 2288, i: "fa-mug-hot" },
        { id: "p401", n: "茶具", p: 2288, i: "fa-coffee" },
        { id: "p402", n: "餐具套装", p: 2288, i: "fa-utensils" },
        { id: "p403", n: "厨房刀具", p: 2288, i: "fa-cutlery" },
        { id: "p404", n: "砧板", p: 2288, i: "fa-cutlery" },
        { id: "p405", n: "保鲜盒", p: 2288, i: "fa-box" },
        { id: "p406", n: "收纳箱", p: 2288, i: "fa-box" },
        { id: "p407", n: "置物架", p: 2288, i: "fa-th" },
        { id: "p408", n: "晾衣架", p: 2288, i: "fa-tshirt" },
        // 2888积分 tier (20 items)
        { id: "p409", n: "跑步机", p: 2888, i: "fa-running" },
        { id: "p410", n: "动感单车", p: 2888, i: "fa-bicycle" },
        { id: "p411", n: "椭圆机", p: 2888, i: "fa-running" },
        { id: "p412", n: "划船机", p: 2888, i: "fa-ship" },
        { id: "p413", n: "哑铃", p: 2888, i: "fa-dumbbell" },
        { id: "p414", n: "杠铃", p: 2888, i: "fa-dumbbell" },
        { id: "p415", n: "瑜伽垫", p: 2888, i: "fa-dumbbell" },
        { id: "p416", n: "健身球", p: 2888, i: "fa-circle" },
        { id: "p417", n: "拉力器", p: 2888, i: "fa-circle" },
        { id: "p418", n: "跳绳", p: 2888, i: "fa-dumbbell" },
        { id: "p419", n: "运动手环", p: 2888, i: "fa-running" },
        { id: "p420", n: "计步器", p: 2888, i: "fa-walking" },
        { id: "p421", n: "心率带", p: 2888, i: "fa-heartbeat" },
        { id: "p422", n: "运动手表", p: 2888, i: "fa-stopwatch" },
        { id: "p423", n: "运动耳机", p: 2888, i: "fa-headphones" },
        { id: "p424", n: "运动水壶", p: 2888, i: "fa-mug-hot" },
        { id: "p425", n: "运动背包", p: 2888, i: "fa-backpack" },
        { id: "p426", n: "护膝", p: 2888, i: "fa-shield-alt" },
        { id: "p427", n: "护腕", p: 2888, i: "fa-shield-alt" },
        { id: "p428", n: "运动服", p: 2888, i: "fa-tshirt" },
        // 3488积分 tier (20 items)
        { id: "p429", n: "洁面仪", p: 3488, i: "fa-spa" },
        { id: "p430", n: "美容仪Pro", p: 3488, i: "fa-spa" },
        { id: "p431", n: "导入导出仪", p: 3488, i: "fa-spa" },
        { id: "p432", n: "射频仪", p: 3488, i: "fa-spa" },
        { id: "p433", n: "光疗仪", p: 3488, i: "fa-spa" },
        { id: "p434", n: "脱毛仪", p: 3488, i: "fa-cut" },
        { id: "p435", n: "美甲灯", p: 3488, i: "fa-lightbulb" },
        { id: "p436", n: "化妆镜", p: 3488, i: "fa-palette" },
        { id: "p437", n: "化妆刷", p: 3488, i: "fa-paint-brush" },
        { id: "p438", n: "美妆蛋", p: 3488, i: "fa-circle" },
        { id: "p439", n: "面膜仪", p: 3488, i: "fa-spa" },
        { id: "p440", n: "蒸脸器", p: 3488, i: "fa-spa" },
        { id: "p441", n: "按摩仪Pro", p: 3488, i: "fa-spa" },
        { id: "p442", n: "刮痧板", p: 3488, i: "fa-spa" },
        { id: "p443", n: "拔罐器", p: 3488, i: "fa-spa" },
        { id: "p444", n: "护肤品套装", p: 3488, i: "fa-spa" },
        { id: "p445", n: "化妆品套装", p: 3488, i: "fa-spa" },
        { id: "p446", n: "香水", p: 3488, i: "fa-spa" },
        { id: "p447", n: "口红", p: 3488, i: "fa-spa" },
        { id: "p448", n: "粉底", p: 3488, i: "fa-spa" },
        // 4088积分 tier (20 items)
        { id: "p449", n: "车载充电器Pro", p: 4088, i: "fa-car" },
        { id: "p450", n: "车载支架Pro", p: 4088, i: "fa-car" },
        { id: "p451", n: "行车记录仪Pro", p: 4088, i: "fa-car" },
        { id: "p452", n: "倒车影像", p: 4088, i: "fa-car" },
        { id: "p453", n: "胎压监测", p: 4088, i: "fa-car" },
        { id: "p454", n: "车载冰箱", p: 4088, i: "fa-car" },
        { id: "p455", n: "车载吸尘器", p: 4088, i: "fa-car" },
        { id: "p456", n: "车载充气泵", p: 4088, i: "fa-car" },
        { id: "p457", n: "应急电源", p: 4088, i: "fa-car" },
        { id: "p458", n: "拖车绳", p: 4088, i: "fa-car" },
        { id: "p459", n: "汽车脚垫", p: 4088, i: "fa-car" },
        { id: "p460", n: "汽车座垫", p: 4088, i: "fa-car" },
        { id: "p461", n: "方向盘套", p: 4088, i: "fa-car" },
        { id: "p462", n: "遮阳挡", p: 4088, i: "fa-car" },
        { id: "p463", n: "车衣", p: 4088, i: "fa-car" },
        { id: "p464", n: "洗车机", p: 4088, i: "fa-car" },
        { id: "p465", n: "打蜡机", p: 4088, i: "fa-car" },
        { id: "p466", n: "抛光机", p: 4088, i: "fa-car" },
        { id: "p467", n: "汽车香水", p: 4088, i: "fa-car" },
        { id: "p468", n: "空气清新剂", p: 4088, i: "fa-car" },
        // 4888积分 tier (15 items)
        { id: "p469", n: "无人机Mini2", p: 4888, i: "fa-helicopter" },
        { id: "p470", n: "运动相机Mini", p: 4888, i: "fa-video" },
        { id: "p471", n: "智能手表Ultra", p: 4888, i: "fa-clock" },
        { id: "p472", n: "平板电脑Mini", p: 4888, i: "fa-tablet" },
        { id: "p473", n: "电子书Mini", p: 4888, i: "fa-book-reader" },
        { id: "p474", n: "智能眼镜", p: 4888, i: "fa-glasses" },
        { id: "p475", n: "AR眼镜", p: 4888, i: "fa-vr-cardboard" },
        { id: "p476", n: "VR设备", p: 4888, i: "fa-vr-cardboard" },
        { id: "p477", n: "游戏机", p: 4888, i: "fa-gamepad" },
        { id: "p478", n: "掌上游戏机", p: 4888, i: "fa-gamepad" },
        { id: "p479", n: "智能手环Ultra", p: 4888, i: "fa-watch" },
        { id: "p480", n: "智能戒指", p: 4888, i: "fa-ring" },
        { id: "p481", n: "智能项链", p: 4888, i: "fa-gem" },
        { id: "p482", n: "智能手表", p: 4888, i: "fa-watch" },
        { id: "p483", n: "智能眼镜Pro", p: 4888, i: "fa-glasses" },
        // 5888积分 tier (10 items)
        { id: "p484", n: "智能门锁Pro", p: 5888, i: "fa-lock" },
        { id: "p485", n: "智能门铃Pro", p: 5888, i: "fa-bell" },
        { id: "p486", n: "智能插座Pro", p: 5888, i: "fa-plug" },
        { id: "p487", n: "智能开关Pro", p: 5888, i: "fa-toggle-on" },
        { id: "p488", n: "温湿度传感器Pro", p: 5888, i: "fa-thermometer-half" },
        { id: "p489", n: "智能窗帘Pro", p: 5888, i: "fa-window-maximize" },
        { id: "p490", n: "智能灯泡Pro", p: 5888, i: "fa-lightbulb" },
        { id: "p491", n: "智能摄像头Pro", p: 5888, i: "fa-video" },
        { id: "p492", n: "智能音箱Pro", p: 5888, i: "fa-volume-up" },
        { id: "p493", n: "智能遥控器Pro", p: 5888, i: "fa-tv" },
        // 6888积分 tier (5 items)
        { id: "p494", n: "高端智能家居套装", p: 6888, i: "fa-home" },
        { id: "p495", n: "全屋智能控制系统", p: 6888, i: "fa-network-wired" },
        { id: "p496", n: "智能安防系统", p: 6888, i: "fa-shield-alt" },
        { id: "p497", n: "智能影音系统", p: 6888, i: "fa-tv" },
        { id: "p498", n: "智能健康管理系统", p: 6888, i: "fa-heartbeat" }
    ];
    const SD = {
        'ph': [
            { b: "Apple", n: "iPhone 13", p: 4780, t: "8+512G", i: "fab fa-apple" }, { b: "Apple", n: "iPhone 15 Pro", p: 7999, t: "256G", i: "fab fa-apple", img: "手机.png" }, { b: "Xiaomi", n: "MIX Fold", p: 3500, t: "12+512G", i: "" }, { b: "OPPO", n: "RENO 10", p: 2400, t: "16+512G", i: "" }, { b: "HUAWEI", n: "Pura 80", p: 5800, t: "12+1T", i: "" }, { b: "ASUS", n: "Z90+", p: 3200, t: "16+1T", i: "" },
            { b: "Samsung", n: "Galaxy S23", p: 4800, t: "8+256G", i: "" }, { b: "Vivo", n: "X90", p: 3100, t: "12+256G", i: "" }, { b: "Honor", n: "Magic 5", p: 3600, t: "12+512G", i: "" }, { b: "OnePlus", n: "11", p: 2900, t: "16+256G", i: "" }, { b: "Google", n: "Pixel 7", p: 3300, t: "8+128G", i: "fab fa-google" },
            { b: "Motorola", n: "Edge+", p: 2700, t: "8+256G", i: "" }, { b: "Realme", n: "GT3", p: 2500, t: "16+1T", i: "" }, { b: "Sony", n: "Xperia 1", p: 6200, t: "12+256G", i: "" }, { b: "Nothing", n: "Phone (2)", p: 3400, t: "12+256G", i: "" }, { b: "Redmi", n: "K60", p: 1900, t: "12+256G", i: "" },
            { b: "Apple", n: "iPhone 14", p: 5200, t: "128G", i: "fab fa-apple" }, { b: "Xiaomi", n: "13 Ultra", p: 5600, t: "12+512G", i: "" }, { b: "HUAWEI", n: "Mate 60", p: 6999, t: "SatCall", i: "" }, { b: "Meizu", n: "20 Pro", p: 3200, t: "12+256G", i: "" }, { b: "ZTE", n: "Axon 40", p: 2800, t: "UnderCam", i: "" },
            { b: "Apple", n: "iPhone SE", p: 3500, t: "128G", i: "fab fa-apple" }, { b: "Xiaomi", n: "Redmi Note 13", p: 1500, t: "8+128G", i: "" }, { b: "OPPO", n: "Find X7", p: 4500, t: "16+512G", i: "" }, { b: "HUAWEI", n: "Nova 12", p: 2800, t: "8+256G", i: "" }, { b: "Vivo", n: "S18", p: 2600, t: "12+256G", i: "" },
            { b: "Honor", n: "Magic 6", p: 4200, t: "16+512G", i: "" }, { b: "OnePlus", n: "12", p: 3800, t: "16+512G", i: "" }, { b: "Realme", n: "GT5 Pro", p: 3200, t: "16+1T", i: "" }, { b: "iQOO", n: "12", p: 4000, t: "16+512G", i: "" }, { b: "Motorola", n: "Edge 40", p: 2400, t: "12+256G", i: "" },
            { b: "Nothing", n: "Phone (2a)", p: 2200, t: "8+128G", i: "" }, { b: "Redmi", n: "K70", p: 2500, t: "12+256G", i: "" }, { b: "Samsung", n: "Galaxy A54", p: 2800, t: "8+256G", i: "" }, { b: "Google", n: "Pixel 8", p: 4500, t: "8+256G", i: "fab fa-google" }, { b: "Sony", n: "Xperia 5 V", p: 5500, t: "12+256G", i: "" },
            { b: "Apple", n: "iPhone 16", p: 6999, t: "256G", i: "fab fa-apple" }, { b: "Apple", n: "iPhone 16 Plus", p: 7999, t: "512G", i: "fab fa-apple" }, { b: "Xiaomi", n: "14 Pro", p: 4200, t: "12+256G", i: "" }, { b: "OPPO", n: "Find X8", p: 5200, t: "16+512G", i: "" }, { b: "HUAWEI", n: "Pura 90", p: 6800, t: "16+1T", i: "" },
            { b: "ASUS", n: "ROG Phone 8", p: 5800, t: "18+1T", i: "" }, { b: "Samsung", n: "Galaxy S24 Ultra", p: 8800, t: "12+512G", i: "" }, { b: "Vivo", n: "X100 Pro", p: 4800, t: "16+512G", i: "" }, { b: "Honor", n: "Magic 7", p: 5200, t: "16+1T", i: "" }, { b: "OnePlus", n: "13", p: 4200, t: "16+512G", i: "" },
            { b: "Google", n: "Pixel 9", p: 5800, t: "12+256G", i: "fab fa-google" }, { b: "Motorola", n: "Edge 50", p: 3200, t: "12+256G", i: "" }, { b: "Realme", n: "GT6", p: 2800, t: "16+1T", i: "" }, { b: "Sony", n: "Xperia 1 VI", p: 7200, t: "12+512G", i: "" }, { b: "Nothing", n: "Phone (3)", p: 4200, t: "12+512G", i: "" },
            { b: "Redmi", n: "K80", p: 2800, t: "16+256G", i: "" }, { b: "Samsung", n: "Galaxy A75", p: 3200, t: "12+256G", i: "" }, { b: "Apple", n: "iPhone 15", p: 5999, t: "128G", i: "fab fa-apple" }, { b: "Xiaomi", n: "Redmi Note 14", p: 1800, t: "12+128G", i: "" }, { b: "OPPO", n: "RENO 11", p: 2800, t: "16+256G", i: "" },
            { b: "HUAWEI", n: "Nova 13", p: 3200, t: "12+256G", i: "" }, { b: "Vivo", n: "S19", p: 3000, t: "16+256G", i: "" }, { b: "Honor", n: "Magic 8", p: 4800, t: "16+512G", i: "" }, { b: "OnePlus", n: "13 Pro", p: 4800, t: "16+1T", i: "" }, { b: "Realme", n: "GT6 Pro", p: 3800, t: "16+1T", i: "" },
            { b: "iQOO", n: "13", p: 4500, t: "16+512G", i: "" }, { b: "Motorola", n: "Edge 50 Pro", p: 2800, t: "16+256G", i: "" }, { b: "Nothing", n: "Phone (3a)", p: 2600, t: "12+128G", i: "" }, { b: "Redmi", n: "K80 Pro", p: 3200, t: "16+512G", i: "" }, { b: "Samsung", n: "Galaxy A85", p: 3600, t: "12+512G", i: "" },
            { b: "Google", n: "Pixel 9 Pro", p: 6800, t: "12+512G", i: "fab fa-google" }, { b: "Sony", n: "Xperia 10 VI", p: 4200, t: "8+256G", i: "" }, { b: "Apple", n: "iPhone SE 4", p: 4200, t: "256G", i: "fab fa-apple" }, { b: "Xiaomi", n: "15 Ultra", p: 6200, t: "16+512G", i: "" }, { b: "OPPO", n: "Find X9", p: 5800, t: "16+1T", i: "" },
            { b: "HUAWEI", n: "Mate 70", p: 7999, t: "SatCall Pro", i: "" }, { b: "Meizu", n: "21 Pro", p: 3800, t: "16+256G", i: "" }, { b: "ZTE", n: "Axon 50", p: 3200, t: "UnderCam Pro", i: "" }, { b: "Apple", n: "iPhone 16 Pro Max", p: 9999, t: "1T", i: "fab fa-apple" }, { b: "Xiaomi", n: "Redmi Note 15", p: 2000, t: "12+256G", i: "" },
            { b: "OPPO", n: "RENO 12", p: 3200, t: "16+512G", i: "" }, { b: "HUAWEI", n: "Nova 14", p: 3600, t: "12+512G", i: "" }, { b: "Vivo", n: "S20", p: 3400, t: "16+512G", i: "" }, { b: "Honor", n: "Magic 9", p: 5500, t: "16+1T", i: "" }, { b: "OnePlus", n: "14", p: 5200, t: "16+1T", i: "" },
            { b: "Realme", n: "GT7", p: 3500, t: "16+1T", i: "" }, { b: "iQOO", n: "13 Pro", p: 5200, t: "16+1T", i: "" }, { b: "Motorola", n: "Edge 60", p: 3600, t: "16+512G", i: "" }, { b: "Nothing", n: "Phone (4)", p: 4800, t: "16+512G", i: "" }, { b: "Redmi", n: "K90", p: 3500, t: "16+512G", i: "" },
            { b: "Samsung", n: "Galaxy A95", p: 4000, t: "16+256G", i: "" }, { b: "Google", n: "Pixel 10", p: 7200, t: "16+512G", i: "fab fa-google" }, { b: "Sony", n: "Xperia Pro-I 2", p: 9800, t: "16+1T", i: "" },
            { b: "Apple", n: "iPhone 17", p: 8999, t: "256G", i: "fab fa-apple" }, { b: "Apple", n: "iPhone 17 Pro", p: 10999, t: "512G", i: "fab fa-apple" }, { b: "Xiaomi", n: "15 Ultra", p: 6800, t: "16+1T", i: "" }, { b: "OPPO", n: "Find X9", p: 6800, t: "16+1T", i: "" }, { b: "HUAWEI", n: "Pura 100", p: 8800, t: "16+1T", i: "" },
            { b: "ASUS", n: "ROG Phone 9", p: 7800, t: "18+1T", i: "" }, { b: "Samsung", n: "Galaxy S25 Ultra", p: 10800, t: "16+1T", i: "" }, { b: "Vivo", n: "X200 Pro", p: 6800, t: "16+1T", i: "" }, { b: "Honor", n: "Magic 10", p: 7200, t: "16+1T", i: "" }, { b: "OnePlus", n: "15", p: 6200, t: "16+1T", i: "" },
            { b: "Google", n: "Pixel 11", p: 8800, t: "16+1T", i: "fab fa-google" }, { b: "Motorola", n: "Edge 70", p: 4200, t: "16+512G", i: "" }, { b: "Realme", n: "GT8", p: 3800, t: "16+1T", i: "" }, { b: "Sony", n: "Xperia 1 VII", p: 9200, t: "16+1T", i: "" }, { b: "Nothing", n: "Phone (5)", p: 5800, t: "16+1T", i: "" },
            { b: "Redmi", n: "K100", p: 3800, t: "16+512G", i: "" }, { b: "Samsung", n: "Galaxy A105", p: 4500, t: "16+512G", i: "" }, { b: "Apple", n: "iPhone 18", p: 9999, t: "512G", i: "fab fa-apple" }, { b: "Xiaomi", n: "Redmi Note 16", p: 2200, t: "16+256G", i: "" }, { b: "OPPO", n: "RENO 13", p: 3600, t: "16+512G", i: "" },
            { b: "HUAWEI", n: "Nova 15", p: 4000, t: "16+512G", i: "" }, { b: "Vivo", n: "S21", p: 3800, t: "16+512G", i: "" }, { b: "Honor", n: "Magic 11", p: 6200, t: "16+1T", i: "" }, { b: "OnePlus", n: "15 Pro", p: 6800, t: "16+1T", i: "" }, { b: "Realme", n: "GT9", p: 4200, t: "16+1T", i: "" },
            { b: "iQOO", n: "14 Pro", p: 6800, t: "16+1T", i: "" }, { b: "Motorola", n: "Edge 80", p: 4000, t: "16+512G", i: "" }, { b: "Nothing", n: "Phone (6)", p: 6200, t: "16+1T", i: "" }, { b: "Redmi", n: "K110", p: 4200, t: "16+512G", i: "" }, { b: "Samsung", n: "Galaxy A115", p: 4800, t: "16+512G", i: "" },
            { b: "Google", n: "Pixel 12", p: 9800, t: "16+1T", i: "fab fa-google" }, { b: "Sony", n: "Xperia Pro-I 3", p: 11800, t: "18+1T", i: "" }, { b: "Apple", n: "iPhone 19", p: 11999, t: "1T", i: "fab fa-apple" }, { b: "Xiaomi", n: "16 Ultra", p: 7800, t: "18+1T", i: "" }, { b: "OPPO", n: "Find X10", p: 7800, t: "18+1T", i: "" },
            { b: "HUAWEI", n: "Pura 110", p: 9800, t: "18+1T", i: "" }, { b: "ASUS", n: "ROG Phone 10", p: 8800, t: "20+1T", i: "" }, { b: "Samsung", n: "Galaxy S26 Ultra", p: 12800, t: "18+1T", i: "" }, { b: "Vivo", n: "X300 Pro", p: 8800, t: "18+1T", i: "" }, { b: "Honor", n: "Magic 12", p: 9200, t: "18+1T", i: "" },
            { b: "OnePlus", n: "16", p: 8200, t: "18+1T", i: "" }, { b: "Google", n: "Pixel 13", p: 10800, t: "18+1T", i: "fab fa-google" }, { b: "Motorola", n: "Edge 90", p: 4800, t: "16+512G", i: "" }, { b: "Realme", n: "GT10", p: 4800, t: "18+1T", i: "" }, { b: "Sony", n: "Xperia 1 VIII", p: 11200, t: "18+1T", i: "" }
        ],
        'sp': [
            { b: "Nike", n: "Air Zoom", p: 899, t: "Running", i: "" }, { b: "Adidas", n: "Jacket", p: 699, t: "Outdoor", i: "" }, { b: "Puma", n: "Hoodie", p: 499, t: "Casual", i: "" }, { b: "Lululemon", n: "Yoga", p: 850, t: "Hot", i: "" },
            { b: "UnderArmour", n: "T-Shirt", p: 299, t: "Train", i: "" }, { b: "NewBalance", n: "327", p: 659, t: "Classic", i: "" }, { b: "NewBalance", n: "574", p: 799, t: "Style", i: "", img: "鞋.png" }, { b: "Reebok", n: "Nano", p: 599, t: "Crossfit", i: "" }, { b: "Asics", n: "Kayano", p: 1099, t: "Run", i: "" }, { b: "Fila", n: "Sneakers", p: 520, t: "Chunky", i: "" },
            { b: "Champion", n: "Sweatshirt", p: 350, t: "Basic", i: "" }, { b: "Chelsea", n: "Football Jersey", p: 599, t: "World Champions", i: "", img: "球衣.png" }, { b: "Vans", n: "Old Skool", p: 450, t: "Skate", i: "" }, { b: "Converse", n: "AllStar", p: 399, t: "High", i: "" }, { b: "Salomon", n: "XT-6", p: 1200, t: "Trail", i: "" }, { b: "TheNorthFace", n: "Puffer", p: 1800, t: "Warm", i: "" },
            { b: "Columbia", n: "Fleece", p: 420, t: "Cozy", i: "" }, { b: "Arc'teryx", n: "Shell", p: 4500, t: "Alpha", i: "" }, { b: "Patagonia", n: "Vest", p: 800, t: "Eco", i: "" }, { b: "Descente", n: "Jacket", p: 2200, t: "Ski", i: "" }, { b: "Mizuno", n: "Rider", p: 750, t: "Wave", i: "" }, { b: "Kappa", n: "Pants", p: 320, t: "Track", i: "" },
            { b: "Nike", n: "Dunk Low", p: 699, t: "Retro", i: "" }, { b: "Adidas", n: "Yeezy 350", p: 1899, t: "Boost", i: "" }, { b: "Puma", n: "RS-X", p: 599, t: "Chunky", i: "" }, { b: "NewBalance", n: "990", p: 1299, t: "Made", i: "" }, { b: "Asics", n: "Gel-Kayano", p: 999, t: "30", i: "" },
            { b: "Brooks", n: "Ghost", p: 899, t: "Running", i: "" }, { b: "Hoka", n: "Clifton", p: 1099, t: "Cushion", i: "" }, { b: "On", n: "Cloud", p: 1199, t: "Swiss", i: "" }, { b: "Allbirds", n: "Tree Runner", p: 699, t: "Eco", i: "" }, { b: "Veja", n: "V-10", p: 799, t: "Brazil", i: "" },
            { b: "Nike", n: "Tech Fleece", p: 599, t: "Hoodie", i: "" }, { b: "Adidas", n: "Tiro", p: 299, t: "Training", i: "" }, { b: "UnderArmour", n: "HeatGear", p: 399, t: "Compression", i: "" }, { b: "Lululemon", n: "Align", p: 750, t: "Leggings", i: "" }, { b: "Gymshark", n: "Flex", p: 450, t: "Seamless", i: "" },
            { b: "Reebok", n: "Nano X3", p: 699, t: "Crossfit", i: "" }, { b: "Nike", n: "Metcon", p: 799, t: "Training", i: "" },
            { b: "Nike", n: "Air Max 270", p: 899, t: "Retro", i: "" }, { b: "Adidas", n: "Ultraboost 23", p: 1399, t: "Boost", i: "" }, { b: "Puma", n: "RS-X4", p: 699, t: "Chunky", i: "" }, { b: "NewBalance", n: "991", p: 1499, t: "Made", i: "" }, { b: "Asics", n: "Gel-Nimbus", p: 1199, t: "25", i: "" },
            { b: "Brooks", n: "Adrenaline", p: 999, t: "GTS", i: "" }, { b: "Hoka", n: "Bondi", p: 1299, t: "8", i: "" }, { b: "On", n: "Cloudrunner", p: 1399, t: "Swiss", i: "" }, { b: "Allbirds", n: "Tree Dasher", p: 799, t: "2", i: "" }, { b: "Veja", n: "V-12", p: 899, t: "Brazil", i: "" },
            { b: "Nike", n: "React Infinity", p: 1099, t: "Run", i: "" }, { b: "Adidas", n: "Solarboost", p: 999, t: "ST", i: "" }, { b: "UnderArmour", n: "HOVR Phantom", p: 1099, t: "Running", i: "" }, { b: "Lululemon", n: "Fast & Free 2", p: 980, t: "Leggings", i: "" }, { b: "Gymshark", n: "Vital", p: 550, t: "Seamless", i: "" },
            { b: "Reebok", n: "Nano X5", p: 799, t: "Crossfit", i: "" }, { b: "Nike", n: "Metcon 9", p: 899, t: "Training", i: "" }, { b: "Nike", n: "Air Force 1", p: 699, t: "07", i: "" }, { b: "Adidas", n: "Superstar", p: 599, t: "Classic", i: "" }, { b: "Puma", n: "Suede Classic", p: 499, t: "Retro", i: "" },
            { b: "Converse", n: "Chuck 70", p: 599, t: "High", i: "" }, { b: "Vans", n: "Authentic", p: 399, t: "Classic", i: "" }, { b: "Salomon", n: "Speedcross 6", p: 1299, t: "Trail", i: "" }, { b: "TheNorthFace", n: "Vectiv", p: 1999, t: "Enduris", i: "" }, { b: "Columbia", n: "Trail", p: 899, t: "Running", i: "" },
            { b: "Arc'teryx", n: "Norvan", p: 1299, t: "LD 3", i: "" }, { b: "Patagonia", n: "Trail", p: 1099, t: "Running", i: "" }, { b: "Descente", n: "Running", p: 1299, t: "Speed", i: "" }, { b: "Mizuno", n: "Wave Rider", p: 899, t: "27", i: "" }, { b: "Kappa", n: "Track Suit", p: 420, t: "Full", i: "" },
            { b: "Nike", n: "Dunk High", p: 799, t: "Retro", i: "" }, { b: "Adidas", n: "Yeezy 700", p: 2199, t: "V3", i: "" }, { b: "Puma", n: "Thunder", p: 699, t: "Spectra", i: "" }, { b: "NewBalance", n: "550", p: 699, t: "Retro", i: "" }, { b: "Asics", n: "Gel-Quantum", p: 1099, t: "360", i: "" },
            { b: "Brooks", n: "Glycerin", p: 1199, t: "20", i: "" }, { b: "Hoka", n: "Speedgoat", p: 1399, t: "5", i: "" }, { b: "On", n: "Cloudmonster", p: 1499, t: "Swiss", i: "" }, { b: "Allbirds", n: "Wool Runner", p: 699, t: "Mizzle", i: "" }, { b: "Veja", n: "Campo", p: 899, t: "Brazil", i: "" },
            { b: "Nike", n: "Pegasus", p: 999, t: "40", i: "" }, { b: "Adidas", n: "Pureboost", p: 899, t: "Go", i: "" }, { b: "UnderArmour", n: "Charged", p: 799, t: "Assert", i: "" }, { b: "Lululemon", n: "Wunder Train", p: 880, t: "Leggings", i: "" }, { b: "Gymshark", n: "Energy", p: 480, t: "Seamless", i: "" },
            { b: "Reebok", n: "Classic", p: 499, t: "Leather", i: "" }, { b: "Nike", n: "Court", p: 599, t: "Vintage", i: "" },
            { b: "Nike", n: "Air Max 270", p: 1099, t: "Cushion", i: "" }, { b: "Adidas", n: "Ultraboost 23", p: 1299, t: "Prime", i: "" }, { b: "Puma", n: "RS-X", p: 799, t: "Retro", i: "" }, { b: "Lululemon", n: "Align", p: 980, t: "Nulu", i: "" }, { b: "UnderArmour", n: "HOVR", p: 899, t: "Zero", i: "" },
            { b: "NewBalance", n: "990v6", p: 1299, t: "Made", i: "" }, { b: "NewBalance", n: "550", p: 699, t: "Retro", i: "" }, { b: "Reebok", n: "Club C", p: 599, t: "Vintage", i: "" }, { b: "Asics", n: "Gel-Nimbus", p: 1199, t: "25", i: "" }, { b: "Fila", n: "Disruptor", p: 699, t: "II", i: "" },
            { b: "Nike", n: "Dunk Low", p: 899, t: "Retro", i: "" }, { b: "Adidas", n: "Stan Smith", p: 699, t: "Classic", i: "" }, { b: "Puma", n: "Suede", p: 599, t: "Classic", i: "" }, { b: "Lululemon", n: "Fast & Free", p: 1080, t: "Nulux", i: "" }, { b: "UnderArmour", n: "Curry", p: 1099, t: "Flow", i: "" },
            { b: "NewBalance", n: "2002R", p: 999, t: "Protection", i: "" }, { b: "Reebok", n: "Question", p: 899, t: "Mid", i: "" }, { b: "Asics", n: "Gel-Kayano", p: 1099, t: "30", i: "" }, { b: "Fila", n: "Ray", p: 599, t: "Tracer", i: "" }, { b: "Nike", n: "Blazer", p: 799, t: "Mid", i: "" },
            { b: "Adidas", n: "Superstar", p: 799, t: "Shell", i: "" }, { b: "Puma", n: "Thunder", p: 899, t: "Spectra", i: "" }, { b: "Lululemon", n: "Wunder", p: 980, t: "Under", i: "" }, { b: "UnderArmour", n: "Project Rock", p: 1299, t: "BFR", i: "" }, { b: "NewBalance", n: "9060", p: 1099, t: "Yurt", i: "" },
            { b: "Reebok", n: "Instapump", p: 799, t: "Fury", i: "" }, { b: "Asics", n: "Gel-Quantum", p: 1199, t: "360", i: "" }, { b: "Fila", n: "Grant Hill", p: 899, t: "2", i: "" }, { b: "Nike", n: "Air Force 1", p: 899, t: "07", i: "" }, { b: "Adidas", n: "Yeezy", p: 1999, t: "350", i: "" },
            { b: "Puma", n: "Clyde", p: 699, t: "All-Pro", i: "" }, { b: "Lululemon", n: "Define", p: 1080, t: "Jacket", i: "" }, { b: "UnderArmour", n: "Charged", p: 799, t: "Assert", i: "" }, { b: "NewBalance", n: "327", p: 699, t: "Casual", i: "" }, { b: "Reebok", n: "Zig", p: 899, t: "Kinetica", i: "" },
            { b: "Asics", n: "Gel-Lyte", p: 999, t: "III", i: "" }, { b: "Fila", n: "Mindblower", p: 799, t: "Mid", i: "" }, { b: "Nike", n: "React", p: 1099, t: "Element", i: "" }, { b: "Adidas", n: "NMD", p: 1299, t: "R1", i: "" }, { b: "Puma", n: "Future", p: 999, t: "Z", i: "" },
            { b: "Lululemon", n: "Scuba", p: 1280, t: "Hoodie", i: "" }, { b: "UnderArmour", n: "Hustle", p: 899, t: "Duffle", i: "" }, { b: "NewBalance", n: "530", p: 799, t: "Retro", i: "" }, { b: "Reebok", n: "Floatride", p: 1099, t: "Energy", i: "" }, { b: "Asics", n: "Gel-Cumulus", p: 999, t: "25", i: "" },
            { b: "Fila", n: "Grant Hill", p: 999, t: "3", i: "" }, { b: "Nike", n: "Pegasus", p: 999, t: "40", i: "" }, { b: "Adidas", n: "Gazelle", p: 799, t: "OG", i: "" }, { b: "Puma", n: "Speedcat", p: 699, t: "Pro", i: "" }, { b: "Lululemon", n: "Energy", p: 980, t: "Bra", i: "" }
        ],
        'fa': [
            { b: "LV", n: "Handbag", p: 15800, t: "Limited", i: "" }, { b: "Gucci", n: "Belt", p: 3500, t: "Unisex", i: "" }, { b: "Gucci", n: "Bag", p: 8500, t: "GG", i: "", img: "包.png" }, { b: "Dior", n: "Glasses", p: 2800, t: "Star", i: "" },
            { b: "Prada", n: "Wallet", p: 4200, t: "Saffiano", i: "" }, { b: "Hermes", n: "Scarf", p: 3800, t: "Silk", i: "" }, { b: "Chanel", n: "Brooch", p: 4500, t: "Copy", i: "" }, { b: "Burberry", n: "Trench", p: 12000, t: "Heritage", i: "" }, { b: "Fendi", n: "Bagute", p: 90, t: "Icon", i: "" },
            { b: "Balenciaga", n: "Cap", p: 2800, t: "Logo", i: "" }, { b: "Versace", n: "Shirt", p: 6500, t: "Silk", i: "" }, { b: "Armani", n: "Suit", p: 25000, t: "Formal", i: "" }, { b: "Cartier", n: "Ring", p: 8500, t: "Love", i: "" }, { b: "Tiffany", n: "Necklace", p: 6000, t: "Silver", i: "" },
            { b: "Bvlgari", n: "Bracelet", p: 12000, t: "Serpenti", i: "" }, { b: "Rolex", n: "Watch", p: 85000, t: "Sub", i: "" }, { b: "Omega", n: "Speedmaster", p: 42000, t: "Moon", i: "" }, { b: "Celine", n: "Tote", p: 14000, t: "Box", i: "" }, { b: "Loewe", n: "Puzzle", p: 19000, t: "Leather", i: "" }, { b: "YSL", n: "Kate", p: 13500, t: "Chain", i: "" }, { b: "Coach", n: "Tabby", p: 3500, t: "C", i: "" },
            { b: "LV", n: "Speedy", p: 12000, t: "25", i: "" }, { b: "Gucci", n: "Dionysus", p: 15000, t: "GG", i: "" }, { b: "Dior", n: "Lady Dior", p: 28000, t: "Cannage", i: "" }, { b: "Prada", n: "Cahier", p: 18000, t: "Leather", i: "" }, { b: "Hermes", n: "Picotin", p: 22000, t: "Lock", i: "" },
            { b: "Chanel", n: "Boy", p: 35000, t: "Quilted", i: "" }, { b: "Burberry", n: "Lola", p: 11000, t: "Check", i: "" }, { b: "Fendi", n: "Peekaboo", p: 25000, t: "Iconic", i: "" }, { b: "Balenciaga", n: "City", p: 12000, t: "Motorcycle", i: "" }, { b: "Versace", n: "Medusa", p: 15000, t: "Head", i: "" },
            { b: "Armani", n: "Tote", p: 8000, t: "Business", i: "" }, { b: "Cartier", n: "Tank", p: 28000, t: "Watch", i: "" }, { b: "Tiffany", n: "T", p: 12000, t: "Collection", i: "" }, { b: "Bvlgari", n: "Serpenti", p: 18000, t: "Bag", i: "" }, { b: "Celine", n: "Belt", p: 9000, t: "Bag", i: "" },
            { b: "Loewe", n: "Hammock", p: 16000, t: "Leather", i: "" }, { b: "YSL", n: "Sac de Jour", p: 20000, t: "Tote", i: "" },
            { b: "LV", n: "Neverfull MM", p: 13800, t: "Damier", i: "" }, { b: "Gucci", n: "Marmont Mini", p: 7500, t: "GG", i: "" }, { b: "Dior", n: "Book Tote", p: 25000, t: "Oblique", i: "" }, { b: "Prada", n: "Re-Edition", p: 12000, t: "Nylon", i: "" }, { b: "Hermes", n: "Evelyn", p: 18000, t: "PM", i: "" },
            { b: "Chanel", n: "Gabrielle", p: 32000, t: "Quilted", i: "" }, { b: "Burberry", n: "Banner", p: 10000, t: "Check", i: "" }, { b: "Fendi", n: "Baguette", p: 15000, t: "Iconic", i: "" }, { b: "Balenciaga", n: "Hourglass", p: 11000, t: "XS", i: "" }, { b: "Versace", n: "Medusa", p: 14000, t: "Head", i: "" },
            { b: "Armani", n: "Business", p: 9000, t: "Tote", i: "" }, { b: "Cartier", n: "Santos", p: 32000, t: "Watch", i: "" }, { b: "Tiffany", n: "HardWear", p: 15000, t: "Collection", i: "" }, { b: "Bvlgari", n: "Serpenti Forever", p: 20000, t: "Bag", i: "" }, { b: "Celine", n: "Triomphe", p: 18000, t: "Bag", i: "" },
            { b: "Loewe", n: "Flamenco", p: 14000, t: "Leather", i: "" }, { b: "YSL", n: "Loulou", p: 16000, t: "Chain", i: "" }, { b: "Coach", n: "Willow", p: 4200, t: "C", i: "" }, { b: "LV", n: "Alma", p: 15000, t: "BB", i: "" }, { b: "Gucci", n: "Ophidia", p: 11000, t: "GG", i: "" },
            { b: "Dior", n: "Saddle", p: 28000, t: "Oblique", i: "" }, { b: "Prada", n: "Cleo", p: 14000, t: "Leather", i: "" }, { b: "Hermes", n: "Garden Party", p: 20000, t: "36", i: "" }, { b: "Chanel", n: "19", p: 38000, t: "Quilted", i: "" }, { b: "Burberry", n: "Kensington", p: 12000, t: "Check", i: "" },
            { b: "Fendi", n: "First", p: 18000, t: "Iconic", i: "" }, { b: "Balenciaga", n: "Le Cagole", p: 13000, t: "XS", i: "" }, { b: "Versace", n: "La Medusa", p: 16000, t: "Head", i: "" }, { b: "Armani", n: "Business Pro", p: 10000, t: "Tote", i: "" }, { b: "Cartier", n: "Ballon Bleu", p: 35000, t: "Watch", i: "" },
            { b: "Tiffany", n: "T True", p: 18000, t: "Collection", i: "" }, { b: "Bvlgari", n: "Divas' Dream", p: 22000, t: "Bag", i: "" }, { b: "Celine", n: "Ava", p: 16000, t: "Bag", i: "" }, { b: "Loewe", n: "Gate", p: 12000, t: "Leather", i: "" }, { b: "YSL", n: "Sunset", p: 18000, t: "Chain", i: "" },
            { b: "Coach", n: "Rogue", p: 4800, t: "C", i: "" }, { b: "LV", n: "Pochette Metis", p: 16000, t: "Monogram", i: "" }, { b: "Gucci", n: "Jackie", p: 13000, t: "GG", i: "" }, { b: "Dior", n: "Diorama", p: 24000, t: "Cannage", i: "" }, { b: "Prada", n: "Galleria", p: 16000, t: "Saffiano", i: "" },
            { b: "Hermes", n: "Lindy", p: 25000, t: "26", i: "" }, { b: "Chanel", n: "WOC", p: 22000, t: "Quilted", i: "" }, { b: "Burberry", n: "Belt", p: 8000, t: "Check", i: "" }, { b: "Fendi", n: "By The Way", p: 14000, t: "Iconic", i: "" }, { b: "Balenciaga", n: "Neo Classic", p: 12000, t: "XS", i: "" },
            { b: "Versace", n: "Palazzo", p: 15000, t: "Medusa", i: "" }, { b: "Armani", n: "Business Elite", p: 11000, t: "Tote", i: "" }, { b: "Cartier", n: "Panthère", p: 38000, t: "Watch", i: "" }, { b: "Tiffany", n: "T Wire", p: 20000, t: "Collection", i: "" }, { b: "Bvlgari", n: "B.Zero1", p: 18000, t: "Bag", i: "" },
            { b: "Celine", n: "Belt Nano", p: 14000, t: "Bag", i: "" }, { b: "Loewe", n: "Barcelona", p: 15000, t: "Leather", i: "" }, { b: "YSL", n: "Envelope", p: 14000, t: "Chain", i: "" }, { b: "Coach", n: "Tabby 26", p: 4000, t: "C", i: "" }, { b: "LV", n: "Croisette", p: 14000, t: "Damier", i: "" },
            { b: "Gucci", n: "Padlock", p: 12000, t: "GG", i: "" }, { b: "Dior", n: "Dioraddict", p: 22000, t: "Cannage", i: "" }, { b: "Prada", n: "Re-Nylon", p: 11000, t: "Re-Edition", i: "" }, { b: "Hermes", n: "Bolide", p: 22000, t: "27", i: "" }, { b: "Chanel", n: "Trendy CC", p: 35000, t: "Quilted", i: "" },
            { b: "Burberry", n: "Belt Bag", p: 7000, t: "Check", i: "" }, { b: "Fendi", n: "Kan I", p: 13000, t: "Iconic", i: "" }, { b: "Balenciaga", n: "Ville", p: 10000, t: "XS", i: "" }, { b: "Versace", n: "Virtus", p: 14000, t: "Medusa", i: "" }, { b: "Armani", n: "Business Plus", p: 9500, t: "Tote", i: "" },
            { b: "Cartier", n: "Tank Must", p: 30000, t: "Watch", i: "" }, { b: "Tiffany", n: "T Smile", p: 16000, t: "Collection", i: "" }, { b: "Bvlgari", n: "Serpenti Tubogas", p: 24000, t: "Bag", i: "" }, { b: "Celine", n: "16", p: 20000, t: "Bag", i: "" }, { b: "Loewe", n: "Cubi", p: 13000, t: "Leather", i: "" },
            { b: "YSL", n: "College", p: 15000, t: "Chain", i: "" }, { b: "Coach", n: "Willow Tote", p: 4500, t: "C", i: "" },
            { b: "LV", n: "Neverfull", p: 18800, t: "MM", i: "" }, { b: "Gucci", n: "Dionysus", p: 16800, t: "GG", i: "" }, { b: "Dior", n: "Lady Dior", p: 28800, t: "Medium", i: "" }, { b: "Prada", n: "Cahier", p: 22800, t: "Astrology", i: "" }, { b: "Hermes", n: "Birkin", p: 188000, t: "30", i: "" },
            { b: "Chanel", n: "Classic Flap", p: 68000, t: "Medium", i: "" }, { b: "Burberry", n: "Banner", p: 12800, t: "Medium", i: "" }, { b: "Fendi", n: "Peekaboo", p: 28800, t: "Regular", i: "" }, { b: "YSL", n: "Kate", p: 16800, t: "Tassel", i: "" }, { b: "Coach", n: "Tabby", p: 3800, t: "26", i: "" },
            { b: "LV", n: "Speedy", p: 12800, t: "30", i: "" }, { b: "Gucci", n: "Marmont", p: 12800, t: "Matelassé", i: "" }, { b: "Dior", n: "Book Tote", p: 22800, t: "Small", i: "" }, { b: "Prada", n: "Re-Edition", p: 12800, t: "2000", i: "" }, { b: "Hermes", n: "Kelly", p: 168000, t: "28", i: "" },
            { b: "Chanel", n: "Boy", p: 48000, t: "Old Medium", i: "" }, { b: "Burberry", n: "Lola", p: 9800, t: "Small", i: "" }, { b: "Fendi", n: "Baguette", p: 18800, t: "Mini", i: "" }, { b: "YSL", n: "Sunset", p: 18800, t: "Medium", i: "" }, { b: "Coach", n: "Willow", p: 4800, t: "Bucket", i: "" },
            { b: "LV", n: "Alma", p: 16800, t: "BB", i: "" }, { b: "Gucci", n: "Jackie", p: 12800, t: "1961", i: "" }, { b: "Dior", n: "Saddle", p: 22800, t: "Oblique", i: "" }, { b: "Prada", n: "Cleo", p: 18800, t: "Brushed", i: "" }, { b: "Hermes", n: "Constance", p: 128000, t: "18", i: "" },
            { b: "Chanel", n: "19", p: 48000, t: "Flap", i: "" }, { b: "Burberry", n: "Pocket", p: 8800, t: "Bag", i: "" }, { b: "Fendi", n: "First", p: 18800, t: "Mini", i: "" }, { b: "YSL", n: "Le 5 à 7", p: 16800, t: "Hobo", i: "" }, { b: "Coach", n: "Rogue", p: 5800, t: "25", i: "" },
            { b: "LV", n: "Pochette", p: 8800, t: "Metis", i: "" }, { b: "Gucci", n: "Ophidia", p: 9800, t: "GG", i: "" }, { b: "Dior", n: "Bobby", p: 22800, t: "East-West", i: "" }, { b: "Prada", n: "Re-Nylon", p: 12800, t: "Re-Edition", i: "" }, { b: "Hermes", n: "Picotin", p: 28000, t: "18", i: "" },
            { b: "Chanel", n: "WOC", p: 28000, t: "Quilted", i: "" }, { b: "Burberry", n: "Knight", p: 6800, t: "Bag", i: "" }, { b: "Fendi", n: "Baguette", p: 18800, t: "Shoulder", i: "" }, { b: "YSL", n: "Envelope", p: 16800, t: "Chain", i: "" }, { b: "Coach", n: "Swinger", p: 3800, t: "20", i: "" },
            { b: "LV", n: "Croisette", p: 12800, t: "Damier", i: "" }, { b: "Gucci", n: "Padlock", p: 12800, t: "Top Handle", i: "" }, { b: "Dior", n: "Diorama", p: 22800, t: "WOC", i: "" }, { b: "Prada", n: "Galleria", p: 18800, t: "Saffiano", i: "" }, { b: "Hermes", n: "Evelyne", p: 28000, t: "PM", i: "" },
            { b: "Chanel", n: "Coco Handle", p: 48000, t: "Small", i: "" }, { b: "Burberry", n: "TB", p: 8800, t: "Monogram", i: "" }, { b: "Fendi", n: "Kan I", p: 18800, t: "F", i: "" }, { b: "YSL", n: "Niki", p: 16800, t: "Medium", i: "" }, { b: "Coach", n: "Turnlock", p: 4800, t: "Tote", i: "" },
            { b: "LV", n: "Noé", p: 12800, t: "BB", i: "" }, { b: "Gucci", n: "Rajah", p: 12800, t: "Tote", i: "" }, { b: "Dior", n: "Dioraddict", p: 22800, t: "Chain", i: "" }, { b: "Prada", n: "Sidonie", p: 18800, t: "Mini", i: "" }, { b: "Hermes", n: "Herbag", p: 28000, t: "31", i: "" },
            { b: "Chanel", n: "GST", p: 38000, t: "Grande", i: "" }, { b: "Burberry", n: "Title", p: 6800, t: "Bag", i: "" }, { b: "Fendi", n: "By The Way", p: 18800, t: "Mini", i: "" }, { b: "YSL", n: "Loulou", p: 16800, t: "Small", i: "" }, { b: "Coach", n: "Bandit", p: 4800, t: "40", i: "" }
        ],
        'li': [
            { b: "Philips", n: "Toothbrush", p: 399, t: "Gift", i: "" }, { b: "Dyson", n: "V12", p: 4500, t: "Clean", i: "" }, { b: "Muji", n: "Aroma", p: 299, t: "Home", i: "" },
            { b: "Xiaomi", n: "Purifier", p: 899, t: "Air", i: "" }, { b: "Roborock", n: "Robot", p: 2500, t: "S7", i: "" }, { b: "Panasonic", n: "HairDryer", p: 450, t: "Nanoe", i: "" }, { b: "Braun", n: "Shaver", p: 1200, t: "Series9", i: "" }, { b: "Oral-B", n: "IO9", p: 1500, t: "Smart", i: "" },
            { b: "Waterpik", n: "Flosser", p: 70, t: "Dental", i: "" }, { b: "L'Occitane", n: "Soap", p: 80, t: "Shea", i: "" }, { b: "TheBodyShop", n: "Butter", p: 120, t: "Mango", i: "" }, { b: "ZaraHome", n: "Candle", p: 150, t: "Scent", i: "" }, { b: "Yankee", n: "Jar", p: 180, t: "Large", i: "" },
            { b: "Brita", n: "Filter", p: 250, t: "Pure", i: "" }, { b: "Tefal", n: "Pan", p: 300, t: "NonStick", i: "" }, { b: "LeCreuset", n: "Pot", p: 1800, t: "CastIron", i: "" }, { b: "Zwilling", n: "Knife", p: 800, t: "Pro", i: "" }, { b: "Joseph", n: "Board", p: 400, t: "Index", i: "" }, { b: "Oxo", n: "Peeler", p: 80, t: "Good", i: "" }, { b: "Thermos", n: "Mug", p: 220, t: "Keep", i: "" },
            { b: "Philips", n: "Airfryer", p: 888, t: "XXL", i: "" }, { b: "Dyson", n: "V15", p: 5200, t: "Detect", i: "" }, { b: "Muji", n: "Diffuser", p: 388, t: "Ultrasonic", i: "" }, { b: "Xiaomi", n: "Dehumidifier", p: 699, t: "Smart", i: "" }, { b: "Roborock", n: "S8", p: 3200, t: "Ultra", i: "" },
            { b: "Panasonic", n: "Ionizer", p: 588, t: "NanoeX", i: "" }, { b: "Braun", n: "Series 7", p: 999, t: "Wet&Dry", i: "" }, { b: "Oral-B", n: "IO10", p: 1800, t: "Ultra", i: "" }, { b: "Waterpik", n: "Water Flosser", p: 388, t: "Cordless", i: "" }, { b: "L'Occitane", n: "Shower Gel", p: 128, t: "Lavender", i: "" },
            { b: "TheBodyShop", n: "Body Butter", p: 158, t: "Shea", i: "" }, { b: "ZaraHome", n: "Diffuser", p: 188, t: "Reed", i: "" }, { b: "Yankee", n: "Candle", p: 228, t: "Medium", i: "" }, { b: "Brita", n: "Stream", p: 388, t: "Pitcher", i: "" }, { b: "Tefal", n: "Pressure Cooker", p: 588, t: "6L", i: "" },
            { b: "LeCreuset", n: "Dutch Oven", p: 2200, t: "5.5QT", i: "" }, { b: "Zwilling", n: "Knife Set", p: 1200, t: "6-Piece", i: "" }, { b: "Joseph", n: "Rocking", p: 288, t: "Grater", i: "" },
            { b: "Philips", n: "Sonicare", p: 488, t: "DiamondClean", i: "" }, { b: "Dyson", n: "V16", p: 5800, t: "Detect+", i: "" }, { b: "Muji", n: "Humidifier", p: 488, t: "Ultrasonic", i: "" }, { b: "Xiaomi", n: "Air Purifier Pro", p: 1099, t: "4", i: "" }, { b: "Roborock", n: "S9", p: 3800, t: "Ultra", i: "" },
            { b: "Panasonic", n: "NanoeX", p: 688, t: "Premium", i: "" }, { b: "Braun", n: "Series 9 Pro", p: 1299, t: "Wet&Dry", i: "" }, { b: "Oral-B", n: "IO11", p: 2000, t: "Ultra", i: "" }, { b: "Waterpik", n: "Water Flosser Pro", p: 488, t: "Cordless", i: "" }, { b: "L'Occitane", n: "Body Lotion", p: 168, t: "Shea", i: "" },
            { b: "TheBodyShop", n: "Body Yogurt", p: 188, t: "Mango", i: "" }, { b: "ZaraHome", n: "Reed Diffuser", p: 228, t: "Reed", i: "" }, { b: "Yankee", n: "Candle Large", p: 268, t: "Large", i: "" }, { b: "Brita", n: "Stream XL", p: 488, t: "Pitcher", i: "" }, { b: "Tefal", n: "Pressure Cooker Pro", p: 688, t: "8L", i: "" },
            { b: "LeCreuset", n: "Dutch Oven XL", p: 2800, t: "7.25QT", i: "" }, { b: "Zwilling", n: "Knife Set Pro", p: 1500, t: "8-Piece", i: "" }, { b: "Joseph", n: "Rocking Pro", p: 388, t: "Grater", i: "" }, { b: "Philips", n: "Airfryer XXL Pro", p: 1088, t: "XXL", i: "" }, { b: "Dyson", n: "V17", p: 6200, t: "Detect++", i: "" },
            { b: "Muji", n: "Diffuser Pro", p: 488, t: "Ultrasonic", i: "" }, { b: "Xiaomi", n: "Dehumidifier Pro", p: 899, t: "Smart", i: "" }, { b: "Roborock", n: "S10", p: 4200, t: "Ultra Pro", i: "" }, { b: "Panasonic", n: "Ionizer Pro", p: 688, t: "NanoeX", i: "" }, { b: "Braun", n: "Series 8", p: 1099, t: "Wet&Dry", i: "" },
            { b: "Oral-B", n: "IO12", p: 2200, t: "Ultra Pro", i: "" }, { b: "Waterpik", n: "Water Flosser Ultra", p: 588, t: "Cordless", i: "" }, { b: "L'Occitane", n: "Shower Oil", p: 168, t: "Almond", i: "" }, { b: "TheBodyShop", n: "Body Scrub", p: 198, t: "Shea", i: "" }, { b: "ZaraHome", n: "Candle Set", p: 258, t: "3-Pack", i: "" },
            { b: "Yankee", n: "Candle Small", p: 188, t: "Small", i: "" }, { b: "Brita", n: "Stream Max", p: 588, t: "Pitcher", i: "" }, { b: "Tefal", n: "Pressure Cooker Max", p: 788, t: "10L", i: "" }, { b: "LeCreuset", n: "Dutch Oven Mini", p: 1800, t: "3.5QT", i: "" }, { b: "Zwilling", n: "Knife Set Elite", p: 1800, t: "10-Piece", i: "" },
            { b: "Joseph", n: "Rocking Elite", p: 488, t: "Grater", i: "" }, { b: "Philips", n: "Sonicare Elite", p: 588, t: "DiamondClean", i: "" }, { b: "Dyson", n: "V18", p: 6800, t: "Detect+++", i: "" }, { b: "Muji", n: "Humidifier Pro", p: 588, t: "Ultrasonic", i: "" }, { b: "Xiaomi", n: "Air Purifier Max", p: 1299, t: "4 Pro", i: "" },
            { b: "Roborock", n: "S11", p: 4800, t: "Ultra Max", i: "" }, { b: "Panasonic", n: "NanoeX Pro", p: 788, t: "Premium", i: "" }, { b: "Braun", n: "Series 9 Elite", p: 1499, t: "Wet&Dry", i: "" }, { b: "Oral-B", n: "IO13", p: 2400, t: "Ultra Elite", i: "" }, { b: "Waterpik", n: "Water Flosser Elite", p: 688, t: "Cordless", i: "" },
            { b: "L'Occitane", n: "Hand Cream", p: 128, t: "Shea", i: "" }, { b: "TheBodyShop", n: "Body Butter Pro", p: 208, t: "Shea", i: "" }, { b: "ZaraHome", n: "Room Spray", p: 128, t: "Scent", i: "" }, { b: "Yankee", n: "Candle Medium", p: 228, t: "Medium", i: "" }, { b: "Brita", n: "Stream Plus", p: 388, t: "Pitcher", i: "" },
            { b: "Tefal", n: "Pressure Cooker Plus", p: 588, t: "6L", i: "" }, { b: "LeCreuset", n: "Dutch Oven Plus", p: 2400, t: "6.75QT", i: "" }, { b: "Zwilling", n: "Knife Set Plus", p: 1300, t: "7-Piece", i: "" }, { b: "Joseph", n: "Rocking Plus", p: 388, t: "Grater", i: "" }, { b: "Philips", n: "Sonicare Plus", p: 488, t: "DiamondClean", i: "" },
            { b: "Dyson", n: "V19", p: 7200, t: "Detect Max", i: "" }, { b: "Muji", n: "Humidifier Plus", p: 488, t: "Ultrasonic", i: "" }, { b: "Xiaomi", n: "Air Purifier Plus", p: 1199, t: "4 Plus", i: "" }, { b: "Roborock", n: "S12", p: 5200, t: "Ultra Plus", i: "" }, { b: "Panasonic", n: "NanoeX Plus", p: 688, t: "Premium", i: "" },
            { b: "Braun", n: "Series 9 Plus", p: 1399, t: "Wet&Dry", i: "" }, { b: "Oral-B", n: "IO14", p: 2600, t: "Ultra Plus", i: "" }, { b: "Waterpik", n: "Water Flosser Plus", p: 588, t: "Cordless", i: "" }, { b: "L'Occitane", n: "Body Milk", p: 188, t: "Shea", i: "" }, { b: "TheBodyShop", n: "Body Lotion Pro", p: 218, t: "Shea", i: "" },
            { b: "ZaraHome", n: "Candle Pro", p: 288, t: "Large", i: "" }, { b: "Yankee", n: "Candle XL", p: 288, t: "XL", i: "" }, { b: "Brita", n: "Stream Elite", p: 588, t: "Pitcher", i: "" }, { b: "Tefal", n: "Pressure Cooker Elite", p: 888, t: "12L", i: "" }, { b: "LeCreuset", n: "Dutch Oven Elite", p: 3000, t: "8QT", i: "" },
            { b: "Zwilling", n: "Knife Set Max", p: 2000, t: "12-Piece", i: "" }, { b: "Joseph", n: "Rocking Max", p: 588, t: "Grater", i: "" },
            { b: "Philips", n: "Sonicare", p: 599, t: "DiamondClean", i: "" }, { b: "Dyson", n: "V15", p: 5800, t: "Detect", i: "" }, { b: "Muji", n: "Humidifier", p: 488, t: "Ultrasonic", i: "" }, { b: "Xiaomi", n: "Air Purifier", p: 1299, t: "4 Pro", i: "" }, { b: "Roborock", n: "S8", p: 3800, t: "Ultra", i: "" },
            { b: "Panasonic", n: "EH-NA98", p: 699, t: "Nanoe", i: "" }, { b: "Braun", n: "Series 9 Pro", p: 1800, t: "Sonic", i: "" }, { b: "Oral-B", n: "iO10", p: 2200, t: "Ultra", i: "" }, { b: "Philips", n: "Airfryer", p: 1299, t: "XXL", i: "" }, { b: "Dyson", n: "Supersonic", p: 3200, t: "Hair Dryer", i: "" },
            { b: "Muji", n: "Aroma Diffuser", p: 388, t: "LED", i: "" }, { b: "Xiaomi", n: "Smart Kettle", p: 199, t: "1.5L", i: "" }, { b: "Roborock", n: "G10S", p: 3200, t: "Auto", i: "" }, { b: "Panasonic", n: "EP-MA70", p: 899, t: "Massage", i: "" }, { b: "Braun", n: "Multiquick", p: 699, t: "9", i: "" },
            { b: "Oral-B", n: "Genius X", p: 899, t: "Smart", i: "" }, { b: "Philips", n: "Hue", p: 699, t: "Starter", i: "" }, { b: "Dyson", n: "Pure Cool", p: 3800, t: "TP04", i: "" }, { b: "Muji", n: "LED Light", p: 188, t: "Desk", i: "" }, { b: "Xiaomi", n: "Mi Band", p: 299, t: "8 Pro", i: "" },
            { b: "Roborock", n: "Q Revo", p: 2800, t: "Pro", i: "" }, { b: "Panasonic", n: "ES-LV9A", p: 1299, t: "Arc5", i: "" }, { b: "Braun", n: "ThermoScan", p: 399, t: "7", i: "" }, { b: "Oral-B", n: "Pro 3", p: 599, t: "3000", i: "" }, { b: "Philips", n: "Wake-up", p: 699, t: "Light", i: "" },
            { b: "Dyson", n: "Airwrap", p: 4200, t: "Complete", i: "" }, { b: "Muji", n: "Storage", p: 288, t: "Box", i: "" }, { b: "Xiaomi", n: "Smart Scale", p: 199, t: "2", i: "" }, { b: "Roborock", n: "S7 MaxV", p: 3500, t: "Ultra", i: "" }, { b: "Panasonic", n: "ER-GN30", p: 299, t: "Nose", i: "" },
            { b: "Braun", n: "Series 7", p: 899, t: "70-B7200", i: "" }, { b: "Oral-B", n: "Vitality", p: 299, t: "100", i: "" }, { b: "Philips", n: "OneBlade", p: 399, t: "Pro", i: "" }, { b: "Dyson", n: "Cool", p: 3200, t: "AM09", i: "" }, { b: "Muji", n: "Travel", p: 188, t: "Set", i: "" },
            { b: "Xiaomi", n: "Mi Electric", p: 299, t: "Scooter", i: "" }, { b: "Roborock", n: "S6 MaxV", p: 2800, t: "Pro", i: "" }, { b: "Panasonic", n: "EW-DJ10", p: 199, t: "Water", i: "" }, { b: "Braun", n: "Series 5", p: 599, t: "50-B1200", i: "" }, { b: "Oral-B", n: "Smart", p: 1299, t: "1500", i: "" },
            { b: "Philips", n: "Lumea", p: 1999, t: "Prestige", i: "" }, { b: "Dyson", n: "V11", p: 4500, t: "Outsize", i: "" }, { b: "Muji", n: "Cotton", p: 88, t: "Swab", i: "" }, { b: "Xiaomi", n: "Mi Home", p: 199, t: "Camera", i: "" }, { b: "Roborock", n: "S5 Max", p: 2200, t: "Pro", i: "" },
            { b: "Panasonic", n: "NA-128VS8", p: 2999, t: "Washing", i: "" }, { b: "Braun", n: "Series 3", p: 399, t: "30-B1200", i: "" }, { b: "Oral-B", n: "Pulse", p: 199, t: "OxyJet", i: "" }, { b: "Philips", n: "Avent", p: 299, t: "Bottle", i: "" }, { b: "Dyson", n: "V10", p: 3800, t: "Absolute", i: "" },
            { b: "Muji", n: "Cleansing", p: 88, t: "Oil", i: "" }, { b: "Xiaomi", n: "Mi TV", p: 2999, t: "65", i: "" }, { b: "Roborock", n: "S4 Max", p: 1800, t: "Pro", i: "" }, { b: "Panasonic", n: "ER-GB80", p: 399, t: "Beard", i: "" }, { b: "Braun", n: "Series 1", p: 299, t: "10-B1200", i: "" }
        ],
        'di': [
            { b: "Apple", n: "Macbook", p: 12800, t: "M3", i: "fab fa-apple" }, { b: "Apple", n: "MacBook Pro 14", p: 14999, t: "M3 Pro", i: "fab fa-apple", img: "电脑.png" }, { b: "ThinkPad", n: "X1", p: 9800, t: "Biz", i: "" }, { b: "Sony", n: "XM5", p: 2299, t: "Noise", i: "" }, { b: "Lenovo", n: "Yoga", p: 120, t: "4K", i: "" },
            { b: "Dell", n: "XPS 15", p: 14000, t: "OLED", i: "" }, { b: "HP", n: "Spectre", p: 11000, t: "x360", i: "" }, { b: "Asus", n: "ROG", p: 16000, t: "Gaming", i: "" }, { b: "Razer", n: "Blade", p: 18000, t: "14", i: "" }, { b: "Logitech", n: "MX Master", p: 799, t: "3S", i: "" },
            { b: "Keychron", n: "K2", p: 500, t: "Mech", i: "" }, { b: "Samsung", n: "T7", p: 800, t: "SSD", i: "" }, { b: "SanDisk", n: "Extreme", p: 1200, t: "2TB", i: "" }, { b: "GoPro", n: "Hero 11", p: 3200, t: "Action", i: "" }, { b: "DJI", n: "Mini 3", p: 4500, t: "Drone", i: "" },
            { b: "Insta360", n: "X3", p: 2800, t: "360", i: "" }, { b: "Bose", n: "QC45", p: 1800, t: "Comfort", i: "" }, { b: "Apple", n: "Watch Series 9", p: 2999, t: "Smart", i: "", img: "watch.png" }, { b: "JBL", n: "Flip 6", p: 800, t: "BT", i: "", img: "jbl_speaker.png" }, { b: "Sonos", n: "Roam", p: 1500, t: "Wifi", i: "" }, { b: "Nintendo", n: "Switch", p: 2100, t: "OLED", i: "" }, { b: "Valve", n: "SteamDeck", p: 3500, t: "Handheld", i: "" },
            { b: "Apple", n: "MacBook Air", p: 9999, t: "M2", i: "fab fa-apple" }, { b: "ThinkPad", n: "X1 Carbon", p: 12000, t: "Gen 11", i: "" }, { b: "Sony", n: "WH-1000XM5", p: 2899, t: "Noise", i: "" }, { b: "Lenovo", n: "Legion", p: 8800, t: "Gaming", i: "" }, { b: "Dell", n: "Alienware", p: 15000, t: "M18", i: "" },
            { b: "HP", n: "EliteBook", p: 9800, t: "Business", i: "" }, { b: "Asus", n: "ZenBook", p: 7800, t: "OLED", i: "" }, { b: "Razer", n: "DeathAdder", p: 399, t: "V3", i: "" }, { b: "Logitech", n: "G Pro", p: 699, t: "Wireless", i: "" }, { b: "Keychron", n: "Q1", p: 888, t: "Custom", i: "" },
            { b: "Samsung", n: "T9", p: 1200, t: "4TB", i: "" }, { b: "SanDisk", n: "Extreme Pro", p: 1500, t: "4TB", i: "" }, { b: "GoPro", n: "Hero 12", p: 3800, t: "Action", i: "" }, { b: "DJI", n: "Mini 4 Pro", p: 5200, t: "Drone", i: "" }, { b: "Insta360", n: "Go 3", p: 2200, t: "Pocket", i: "" },
            { b: "Bose", n: "QuietComfort", p: 2200, t: "Ultra", i: "" }, { b: "Apple", n: "AirPods Pro", p: 1899, t: "USB-C", i: "fab fa-apple" }, { b: "JBL", n: "Charge 5", p: 999, t: "BT", i: "" }, { b: "Sonos", n: "Era 300", p: 3800, t: "Spatial", i: "" },
            { b: "Apple", n: "MacBook Pro 16", p: 19999, t: "M3 Max", i: "fab fa-apple" }, { b: "ThinkPad", n: "X1 Extreme", p: 15000, t: "Gen 5", i: "" }, { b: "Sony", n: "WH-1000XM6", p: 3299, t: "Noise", i: "" }, { b: "Lenovo", n: "ThinkPad X1", p: 11000, t: "Carbon", i: "" }, { b: "Dell", n: "XPS 17", p: 18000, t: "OLED", i: "" },
            { b: "HP", n: "Spectre x360 16", p: 14000, t: "OLED", i: "" }, { b: "Asus", n: "ROG Strix", p: 18000, t: "Gaming", i: "" }, { b: "Razer", n: "Blade 16", p: 22000, t: "OLED", i: "" }, { b: "Logitech", n: "MX Master 4", p: 999, t: "4S", i: "" }, { b: "Keychron", n: "K3", p: 600, t: "Mech", i: "" },
            { b: "Samsung", n: "T9 Pro", p: 1500, t: "4TB", i: "" }, { b: "SanDisk", n: "Extreme Pro Max", p: 1800, t: "4TB", i: "" }, { b: "GoPro", n: "Hero 13", p: 4200, t: "Action", i: "" }, { b: "DJI", n: "Mini 5", p: 5800, t: "Drone", i: "" }, { b: "Insta360", n: "X4", p: 3200, t: "360", i: "" },
            { b: "Bose", n: "QuietComfort Ultra", p: 2800, t: "Comfort", i: "" }, { b: "Apple", n: "AirPods Max", p: 3999, t: "Smart", i: "fab fa-apple" }, { b: "JBL", n: "Charge 6", p: 1199, t: "BT", i: "" }, { b: "Sonos", n: "Era 500", p: 4800, t: "Spatial", i: "" }, { b: "Nintendo", n: "Switch 2", p: 2800, t: "OLED", i: "" },
            { b: "Valve", n: "Steam Deck 2", p: 4500, t: "1TB", i: "" }, { b: "Apple", n: "MacBook Air M3", p: 10999, t: "M3", i: "fab fa-apple" }, { b: "ThinkPad", n: "X1 Yoga", p: 13000, t: "Gen 9", i: "" }, { b: "Sony", n: "WH-1000XM7", p: 3599, t: "Noise", i: "" }, { b: "Lenovo", n: "Legion Pro", p: 12000, t: "Gaming", i: "" },
            { b: "Dell", n: "Alienware m18", p: 20000, t: "R2", i: "" }, { b: "HP", n: "EliteBook X360", p: 12000, t: "Business", i: "" }, { b: "Asus", n: "ZenBook Pro", p: 9800, t: "OLED", i: "" }, { b: "Razer", n: "DeathAdder V4", p: 499, t: "Pro", i: "" }, { b: "Logitech", n: "G Pro X2", p: 799, t: "Wireless", i: "" },
            { b: "Keychron", n: "Q2", p: 1088, t: "Custom", i: "" }, { b: "Samsung", n: "T10", p: 1800, t: "4TB", i: "" }, { b: "SanDisk", n: "Extreme Pro Ultra", p: 2000, t: "4TB", i: "" }, { b: "GoPro", n: "Hero 14", p: 4800, t: "Action", i: "" }, { b: "DJI", n: "Mini 6", p: 6200, t: "Drone", i: "" },
            { b: "Insta360", n: "Go 4", p: 2800, t: "Pocket", i: "" }, { b: "Bose", n: "QuietComfort Max", p: 3200, t: "Comfort", i: "" }, { b: "Apple", n: "AirPods Pro 2", p: 2199, t: "USB-C", i: "fab fa-apple" }, { b: "JBL", n: "Charge 7", p: 1399, t: "BT", i: "" }, { b: "Sonos", n: "Era 600", p: 5800, t: "Spatial", i: "" },
            { b: "Nintendo", n: "Switch Pro", p: 3200, t: "OLED", i: "" }, { b: "Valve", n: "Steam Deck OLED 2", p: 4999, t: "1TB", i: "" }, { b: "Apple", n: "MacBook Pro 18", p: 24999, t: "M3 Ultra", i: "fab fa-apple" }, { b: "ThinkPad", n: "X1 Carbon Gen 12", p: 14000, t: "Gen 12", i: "" }, { b: "Sony", n: "WH-1000XM8", p: 3899, t: "Noise", i: "" },
            { b: "Lenovo", n: "Yoga Pro 9", p: 10000, t: "4K", i: "" }, { b: "Dell", n: "XPS 13 Plus", p: 12000, t: "OLED", i: "" }, { b: "HP", n: "Spectre x360 14", p: 12000, t: "OLED", i: "" }, { b: "Asus", n: "ROG Zephyrus", p: 16000, t: "Gaming", i: "" }, { b: "Razer", n: "Blade 18", p: 28000, t: "OLED", i: "" },
            { b: "Logitech", n: "MX Master 5", p: 1199, t: "5S", i: "" }, { b: "Keychron", n: "K4", p: 700, t: "Mech", i: "" }, { b: "Samsung", n: "T11", p: 2000, t: "4TB", i: "" }, { b: "SanDisk", n: "Extreme Pro Max Ultra", p: 2200, t: "4TB", i: "" }, { b: "GoPro", n: "Hero 15", p: 5200, t: "Action", i: "" },
            { b: "DJI", n: "Mini 7", p: 6800, t: "Drone", i: "" }, { b: "Insta360", n: "X5", p: 3600, t: "360", i: "" }, { b: "Bose", n: "QuietComfort Elite", p: 3600, t: "Comfort", i: "" }, { b: "Apple", n: "AirPods Pro Max 2", p: 4499, t: "Smart", i: "fab fa-apple" }, { b: "JBL", n: "Charge 8", p: 1599, t: "BT", i: "" },
            { b: "Sonos", n: "Era 700", p: 6800, t: "Spatial", i: "" }, { b: "Nintendo", n: "Switch 3", p: 3600, t: "OLED", i: "" }, { b: "Valve", n: "Steam Deck 3", p: 5500, t: "2TB", i: "" },
            { b: "Apple", n: "MacBook Air", p: 10800, t: "M3", i: "fab fa-apple" }, { b: "Apple", n: "MacBook Pro 16", p: 19999, t: "M3 Max", i: "fab fa-apple" }, { b: "ThinkPad", n: "X1 Carbon", p: 12800, t: "Gen 12", i: "" }, { b: "Sony", n: "WH-1000XM6", p: 3299, t: "Noise", i: "" }, { b: "Lenovo", n: "Yoga 9i", p: 12000, t: "14", i: "" },
            { b: "Dell", n: "XPS 13", p: 12000, t: "Plus", i: "" }, { b: "HP", n: "Spectre x360", p: 13000, t: "14", i: "" }, { b: "Asus", n: "ROG Strix", p: 18000, t: "G18", i: "" }, { b: "Razer", n: "Blade 16", p: 22000, t: "2024", i: "" }, { b: "Logitech", n: "MX Master 4", p: 1099, t: "S", i: "" },
            { b: "Apple", n: "iPad Pro", p: 8999, t: "12.9", i: "fab fa-apple" }, { b: "Microsoft", n: "Surface Pro", p: 8800, t: "10", i: "" }, { b: "Samsung", n: "Galaxy Tab", p: 6800, t: "S9 Ultra", i: "" }, { b: "Sony", n: "WH-1000XM5", p: 2999, t: "Noise", i: "" }, { b: "Bose", n: "QuietComfort", p: 3299, t: "Ultra", i: "" },
            { b: "AirPods", n: "Pro 3", p: 1999, t: "Max", i: "fab fa-apple" }, { b: "Sony", n: "WF-1000XM5", p: 1999, t: "Earbuds", i: "" }, { b: "Bose", n: "QuietComfort", p: 2299, t: "Earbuds", i: "" }, { b: "Sennheiser", n: "Momentum", p: 2999, t: "4", i: "" }, { b: "JBL", n: "Flip 6", p: 899, t: "Portable", i: "" },
            { b: "Apple", n: "iMac", p: 12999, t: "24", i: "fab fa-apple" }, { b: "Microsoft", n: "Surface Laptop", p: 9999, t: "6", i: "" }, { b: "Dell", n: "Alienware", p: 22000, t: "m18", i: "" }, { b: "HP", n: "Omen", p: 15000, t: "17", i: "" }, { b: "Asus", n: "ZenBook", p: 12000, t: "14X", i: "" },
            { b: "Razer", n: "DeathAdder", p: 599, t: "V3 Pro", i: "" }, { b: "Logitech", n: "G Pro X", p: 1299, t: "Superlight", i: "" }, { b: "Corsair", n: "K100", p: 1999, t: "RGB", i: "" }, { b: "SteelSeries", n: "Apex Pro", p: 1799, t: "TKL", i: "" }, { b: "HyperX", n: "Cloud", p: 899, t: "Alpha", i: "" },
            { b: "Apple", n: "Studio Display", p: 12999, t: "27", i: "fab fa-apple" }, { b: "Dell", n: "UltraSharp", p: 3999, t: "U2723DE", i: "" }, { b: "LG", n: "UltraGear", p: 2999, t: "27GP950", i: "" }, { b: "Samsung", n: "Odyssey", p: 4999, t: "G9", i: "" }, { b: "ASUS", n: "ROG Swift", p: 5999, t: "PG32UCDM", i: "" },
            { b: "Apple", n: "Magic Keyboard", p: 899, t: "Pro", i: "fab fa-apple" }, { b: "Logitech", n: "MX Keys", p: 799, t: "Mini", i: "" }, { b: "Keychron", n: "K8", p: 599, t: "Pro", i: "" }, { b: "Corsair", n: "K70", p: 1299, t: "RGB", i: "" }, { b: "Razer", n: "BlackWidow", p: 1299, t: "V4 Pro", i: "" },
            { b: "Apple", n: "Magic Mouse", p: 699, t: "3", i: "fab fa-apple" }, { b: "Logitech", n: "MX Anywhere", p: 699, t: "3S", i: "" }, { b: "Razer", n: "Viper", p: 799, t: "V3", i: "" }, { b: "SteelSeries", n: "Rival", p: 599, t: "5", i: "" }, { b: "Corsair", n: "Sabre", p: 499, t: "RGB Pro", i: "" },
            { b: "Apple", n: "AirTag", p: 229, t: "4-Pack", i: "fab fa-apple" }, { b: "Tile", n: "Mate", p: 199, t: "4-Pack", i: "" }, { b: "Samsung", n: "SmartTag", p: 199, t: "2", i: "" }, { b: "Chipolo", n: "ONE", p: 179, t: "Spot", i: "" }, { b: "Eufy", n: "SmartTrack", p: 199, t: "Link", i: "" },
            { b: "Apple", n: "HomePod", p: 2299, t: "Mini", i: "fab fa-apple" }, { b: "Sonos", n: "Era 100", p: 2499, t: "Stereo", i: "" }, { b: "Bose", n: "SoundLink", p: 1999, t: "Flex", i: "" }, { b: "JBL", n: "Charge 5", p: 1299, t: "Portable", i: "" }, { b: "UE", n: "Boom 3", p: 999, t: "Megaboom", i: "" },
            { b: "Apple", n: "Apple Watch", p: 3299, t: "Ultra 2", i: "fab fa-apple" }, { b: "Samsung", n: "Galaxy Watch", p: 1999, t: "6 Classic", i: "" }, { b: "Garmin", n: "Fenix", p: 5999, t: "7 Pro", i: "" }, { b: "Fitbit", n: "Charge 6", p: 1299, t: "Fitness", i: "" }, { b: "Xiaomi", n: "Mi Band", p: 299, t: "8", i: "" }
        ],
        'sh': [
            { b: "Timberland", n: "Boots", p: 1499, t: "Classic", i: "" }, { b: "Clarks", n: "Desert", p: 999, t: "Leather", i: "" }, { b: "ECCO", n: "Casual", p: 1899, t: "Soft", i: "" },
            { b: "Dr.Martens", n: "1460", p: 1399, t: "8-Eye", i: "" }, { b: "Birkenstock", n: "Arizona", p: 699, t: "Sandal", i: "" }, { b: "Crocs", n: "Clog", p: 350, t: "Comfy", i: "" }, { b: "UGG", n: "Mini", p: 1200, t: "Wool", i: "" }, { b: "RedWing", n: "Moc", p: 2200, t: "USA", i: "" },
            { b: "Nike", n: "AF1", p: 800, t: "White", i: "" }, { b: "Adidas", n: "StanSmith", p: 750, t: "Green", i: "" }, { b: "Onitsuka", n: "Tiger", p: 680, t: "Mexico", i: "" }, { b: "Skechers", n: "GoWalk", p: 450, t: "Slip", i: "" }, { b: "Havaianas", n: "FlipFlop", p: 150, t: "Slim", i: "" },
            { b: "Hunter", n: "RainBoot", p: 900, t: "Tall", i: "" }, { b: "JimmyChoo", n: "Heels", p: 4500, t: "Sparkle", i: "" }, { b: "Louboutin", n: "Pump", p: 5500, t: "RedBottom", i: "" }, { b: "SteveMadden", n: "Boots", p: 800, t: "Chunky", i: "" }, { b: "Aldo", n: "Loafer", p: 600, t: "Office", i: "" }, { b: "ColeHaan", n: "Oxford", p: 1200, t: "Light", i: "" }, { b: "Tod's", n: "Driver", p: 3200, t: "Gommino", i: "" },
            { b: "Timberland", n: "6-Inch", p: 1299, t: "Premium", i: "" }, { b: "Clarks", n: "Wallabee", p: 1099, t: "Suede", i: "" }, { b: "ECCO", n: "Soft", p: 1299, t: "7", i: "" }, { b: "Dr.Martens", n: "1461", p: 1199, t: "3-Eye", i: "" }, { b: "Birkenstock", n: "Boston", p: 799, t: "Clog", i: "" },
            { b: "Crocs", n: "Classic", p: 299, t: "Clog", i: "" }, { b: "UGG", n: "Classic", p: 1100, t: "Short", i: "" }, { b: "RedWing", n: "Iron Ranger", p: 2800, t: "Heritage", i: "" }, { b: "Nike", n: "Dunk High", p: 899, t: "Retro", i: "" }, { b: "Adidas", n: "Samba", p: 699, t: "OG", i: "" },
            { b: "Onitsuka", n: "Mexico 66", p: 599, t: "Deluxe", i: "" }, { b: "Skechers", n: "D'Lites", p: 499, t: "Memory", i: "" }, { b: "Havaianas", n: "Top", p: 128, t: "Flip", i: "" }, { b: "Hunter", n: "Original", p: 999, t: "Tall", i: "" }, { b: "JimmyChoo", n: "Romy", p: 4800, t: "100mm", i: "" },
            { b: "Louboutin", n: "So Kate", p: 5800, t: "120mm", i: "" }, { b: "SteveMadden", n: "Troopa", p: 699, t: "Platform", i: "" },
            { b: "Timberland", n: "Premium 6-Inch", p: 1399, t: "Premium", i: "" }, { b: "Clarks", n: "Desert Boot", p: 1199, t: "Leather", i: "" }, { b: "ECCO", n: "Soft 8", p: 1399, t: "Soft", i: "" }, { b: "Dr.Martens", n: "1460 Pascal", p: 1299, t: "8-Eye", i: "" }, { b: "Birkenstock", n: "Arizona EVA", p: 899, t: "Sandal", i: "" },
            { b: "Crocs", n: "Classic Clog Pro", p: 399, t: "Clog", i: "" }, { b: "UGG", n: "Classic Short Pro", p: 1200, t: "Wool", i: "" }, { b: "RedWing", n: "Iron Ranger Pro", p: 3000, t: "Heritage", i: "" }, { b: "Nike", n: "Dunk High Pro", p: 999, t: "Retro", i: "" }, { b: "Adidas", n: "Samba OG Pro", p: 799, t: "OG", i: "" },
            { b: "Onitsuka", n: "Mexico 66 Deluxe Pro", p: 699, t: "Deluxe", i: "" }, { b: "Skechers", n: "D'Lites Memory Pro", p: 599, t: "Memory", i: "" }, { b: "Havaianas", n: "Top Flip Pro", p: 168, t: "Flip", i: "" }, { b: "Hunter", n: "Original Tall Pro", p: 1099, t: "Tall", i: "" }, { b: "JimmyChoo", n: "Romy 100mm Pro", p: 5000, t: "100mm", i: "" },
            { b: "Louboutin", n: "So Kate 120mm Pro", p: 6000, t: "120mm", i: "" }, { b: "SteveMadden", n: "Troopa Platform Pro", p: 799, t: "Platform", i: "" }, { b: "Timberland", n: "6-Inch Premium Pro", p: 1499, t: "Premium", i: "" }, { b: "Clarks", n: "Wallabee Suede Pro", p: 1199, t: "Suede", i: "" }, { b: "ECCO", n: "Soft 9", p: 1499, t: "Soft", i: "" },
            { b: "Dr.Martens", n: "1461 3-Eye Pro", p: 1299, t: "3-Eye", i: "" }, { b: "Birkenstock", n: "Boston Clog Pro", p: 899, t: "Clog", i: "" }, { b: "Crocs", n: "Classic Clog Elite", p: 449, t: "Clog", i: "" }, { b: "UGG", n: "Classic Short Elite", p: 1300, t: "Wool", i: "" }, { b: "RedWing", n: "Iron Ranger Elite", p: 3200, t: "Heritage", i: "" },
            { b: "Nike", n: "Dunk High Elite", p: 1099, t: "Retro", i: "" }, { b: "Adidas", n: "Samba OG Elite", p: 899, t: "OG", i: "" }, { b: "Onitsuka", n: "Mexico 66 Deluxe Elite", p: 799, t: "Deluxe", i: "" }, { b: "Skechers", n: "D'Lites Memory Elite", p: 699, t: "Memory", i: "" }, { b: "Havaianas", n: "Top Flip Elite", p: 198, t: "Flip", i: "" },
            { b: "Hunter", n: "Original Tall Elite", p: 1199, t: "Tall", i: "" }, { b: "JimmyChoo", n: "Romy 100mm Elite", p: 5200, t: "100mm", i: "" }, { b: "Louboutin", n: "So Kate 120mm Elite", p: 6200, t: "120mm", i: "" }, { b: "SteveMadden", n: "Troopa Platform Elite", p: 899, t: "Platform", i: "" }, { b: "Timberland", n: "6-Inch Premium Elite", p: 1599, t: "Premium", i: "" },
            { b: "Clarks", n: "Wallabee Suede Elite", p: 1299, t: "Suede", i: "" }, { b: "ECCO", n: "Soft 10", p: 1599, t: "Soft", i: "" }, { b: "Dr.Martens", n: "1461 3-Eye Elite", p: 1399, t: "3-Eye", i: "" }, { b: "Birkenstock", n: "Boston Clog Elite", p: 999, t: "Clog", i: "" }, { b: "Crocs", n: "Classic Clog Max", p: 499, t: "Clog", i: "" },
            { b: "UGG", n: "Classic Short Max", p: 1400, t: "Wool", i: "" }, { b: "RedWing", n: "Iron Ranger Max", p: 3400, t: "Heritage", i: "" }, { b: "Nike", n: "Dunk High Max", p: 1199, t: "Retro", i: "" }, { b: "Adidas", n: "Samba OG Max", p: 999, t: "OG", i: "" }, { b: "Onitsuka", n: "Mexico 66 Deluxe Max", p: 899, t: "Deluxe", i: "" },
            { b: "Skechers", n: "D'Lites Memory Max", p: 799, t: "Memory", i: "" }, { b: "Havaianas", n: "Top Flip Max", p: 228, t: "Flip", i: "" }, { b: "Hunter", n: "Original Tall Max", p: 1299, t: "Tall", i: "" }, { b: "JimmyChoo", n: "Romy 100mm Max", p: 5400, t: "100mm", i: "" }, { b: "Louboutin", n: "So Kate 120mm Max", p: 6400, t: "120mm", i: "" },
            { b: "SteveMadden", n: "Troopa Platform Max", p: 999, t: "Platform", i: "" }, { b: "Timberland", n: "6-Inch Premium Max", p: 1699, t: "Premium", i: "" }, { b: "Clarks", n: "Wallabee Suede Max", p: 1399, t: "Suede", i: "" }, { b: "ECCO", n: "Soft 11", p: 1699, t: "Soft", i: "" }, { b: "Dr.Martens", n: "1461 3-Eye Max", p: 1499, t: "3-Eye", i: "" },
            { b: "Birkenstock", n: "Boston Clog Max", p: 1099, t: "Clog", i: "" }, { b: "Crocs", n: "Classic Clog Ultra", p: 549, t: "Clog", i: "" }, { b: "UGG", n: "Classic Short Ultra", p: 1500, t: "Wool", i: "" }, { b: "RedWing", n: "Iron Ranger Ultra", p: 3600, t: "Heritage", i: "" }, { b: "Nike", n: "Dunk High Ultra", p: 1299, t: "Retro", i: "" },
            { b: "Adidas", n: "Samba OG Ultra", p: 1099, t: "OG", i: "" }, { b: "Onitsuka", n: "Mexico 66 Deluxe Ultra", p: 999, t: "Deluxe", i: "" }, { b: "Skechers", n: "D'Lites Memory Ultra", p: 899, t: "Memory", i: "" }, { b: "Havaianas", n: "Top Flip Ultra", p: 258, t: "Flip", i: "" }, { b: "Hunter", n: "Original Tall Ultra", p: 1399, t: "Tall", i: "" },
            { b: "JimmyChoo", n: "Romy 100mm Ultra", p: 5600, t: "100mm", i: "" }, { b: "Louboutin", n: "So Kate 120mm Ultra", p: 6600, t: "120mm", i: "" }, { b: "SteveMadden", n: "Troopa Platform Ultra", p: 1099, t: "Platform", i: "" },
            { b: "Timberland", n: "6-Inch Premium", p: 1899, t: "Waterproof", i: "" }, { b: "Clarks", n: "Desert Boot", p: 1199, t: "Suede", i: "" }, { b: "ECCO", n: "Soft 7", p: 2299, t: "Leather", i: "" }, { b: "Dr.Martens", n: "1461", p: 1499, t: "3-Eye", i: "" }, { b: "Birkenstock", n: "Boston", p: 899, t: "Suede", i: "" },
            { b: "Crocs", n: "Classic Clog", p: 399, t: "Comfort", i: "" }, { b: "UGG", n: "Classic Short", p: 1499, t: "II", i: "" }, { b: "RedWing", n: "Iron Ranger", p: 2999, t: "8111", i: "" }, { b: "Wolverine", n: "1000 Mile", p: 2499, t: "Leather", i: "" }, { b: "Clarks", n: "Wallabee", p: 1099, t: "Suede", i: "" },
            { b: "Timberland", n: "Euro Hiker", p: 1299, t: "Waterproof", i: "" }, { b: "ECCO", n: "Biom", p: 1999, t: "C-Trax", i: "" }, { b: "Dr.Martens", n: "Jadon", p: 1699, t: "Platform", i: "" }, { b: "Birkenstock", n: "Gizeh", p: 699, t: "EVA", i: "" }, { b: "Crocs", n: "Literide", p: 499, t: "Pacer", i: "" },
            { b: "UGG", n: "Tasman", p: 1299, t: "Slipper", i: "" }, { b: "RedWing", n: "Moc Toe", p: 2499, t: "875", i: "" }, { b: "Wolverine", n: "DuraShocks", p: 1999, t: "1000", i: "" }, { b: "Clarks", n: "Originals", p: 999, t: "Desert", i: "" }, { b: "Timberland", n: "Pro", p: 1499, t: "6-Inch", i: "" },
            { b: "ECCO", n: "Soft 8", p: 1999, t: "Leather", i: "" }, { b: "Dr.Martens", n: "Pascal", p: 1399, t: "8-Eye", i: "" }, { b: "Birkenstock", n: "Mayari", p: 799, t: "Leather", i: "" }, { b: "Crocs", n: "Bistro", p: 599, t: "Pro", i: "" }, { b: "UGG", n: "Neumel", p: 1199, t: "Suede", i: "" },
            { b: "RedWing", n: "Postman", p: 1999, t: "101", i: "" }, { b: "Wolverine", n: "Raider", p: 1499, t: "1000", i: "" }, { b: "Clarks", n: "Trigenic", p: 1099, t: "Flex", i: "" }, { b: "Timberland", n: "Killington", p: 1399, t: "Chukka", i: "" }, { b: "ECCO", n: "Soft 9", p: 2099, t: "Leather", i: "" },
            { b: "Dr.Martens", n: "Combs", p: 1299, t: "Poly", i: "" }, { b: "Birkenstock", n: "Gizeh", p: 699, t: "Birko-Flor", i: "" }, { b: "Crocs", n: "Classic", p: 399, t: "Clog", i: "" }, { b: "UGG", n: "Ascot", p: 1099, t: "Slipper", i: "" }, { b: "RedWing", n: "Weekender", p: 1799, t: "Chukka", i: "" },
            { b: "Wolverine", n: "Blvd", p: 1299, t: "1000", i: "" }, { b: "Clarks", n: "Unstructured", p: 999, t: "Flex", i: "" }, { b: "Timberland", n: "White Ledge", p: 1199, t: "Mid", i: "" }, { b: "ECCO", n: "Soft 10", p: 2199, t: "Leather", i: "" }, { b: "Dr.Martens", n: "1460", p: 1499, t: "Smooth", i: "" },
            { b: "Birkenstock", n: "Arizona", p: 799, t: "EVA", i: "" }, { b: "Crocs", n: "Classic", p: 399, t: "Banded", i: "" }, { b: "UGG", n: "Disco", p: 1199, t: "Suede", i: "" }, { b: "RedWing", n: "Sheldon", p: 2299, t: "9060", i: "" }, { b: "Wolverine", n: "Blvd", p: 1399, t: "1000", i: "" },
            { b: "Clarks", n: "Unstructured", p: 1099, t: "Flex", i: "" }, { b: "Timberland", n: "Radford", p: 1299, t: "Waterproof", i: "" }, { b: "ECCO", n: "Soft 11", p: 2299, t: "Leather", i: "" }, { b: "Dr.Martens", n: "1460", p: 1599, t: "Vegan", i: "" }, { b: "Birkenstock", n: "Arizona", p: 899, t: "Birko-Flor", i: "" }
        ],
        'be': [
            { b: "Chanel", n: "N°5", p: 1100, t: "50ml", i: "" }, { b: "Estee", n: "Repair", p: 980, t: "75ml", i: "" }, { b: "Dior", n: "#999", p: 350, t: "Red", i: "" }, { b: "YSL", n: "Cushion", p: 580, t: "Matte", i: "" },
            { b: "Lancome", n: "Genifique", p: 1080, t: "Serum", i: "" }, { b: "SK-II", n: "Essence", p: 1540, t: "Pitera", i: "" }, { b: "LaMer", n: "Cream", p: 2600, t: "Magic", i: "" }, { b: "Kiehl's", n: "Toner", p: 280, t: "Calendula", i: "" }, { b: "MAC", n: "Lipstick", p: 180, t: "Chili", i: "" },
            { b: "TomFord", n: "Palette", p: 750, t: "Quad", i: "" }, { b: "NARS", n: "Blush", p: 300, t: "Orgasm", i: "" }, { b: "CPB", n: "Foundation", p: 900, t: "Radiant", i: "" }, { b: "Guerlain", n: "Balls", p: 520, t: "Meteorites", i: "" }, { b: "JoMalone", n: "Perfume", p: 600, t: "Pear", i: "" },
            { b: "Diptyque", n: "Candle", p: 550, t: "Baies", i: "" }, { b: "Byredo", n: "Rose", p: 1200, t: "Noir", i: "" }, { b: "Aesop", n: "Wash", p: 350, t: "Hand", i: "" }, { b: "Clarins", n: "Oil", p: 480, t: "Body", i: "" }, { b: "Shiseido", n: "Sunscreen", p: 380, t: "Blue", i: "" }, { b: "Biotherm", n: "Aqua", p: 420, t: "Gel", i: "" },
            { b: "Chanel", n: "Coco Mademoiselle", p: 1280, t: "100ml", i: "" }, { b: "Estee", n: "Advanced", p: 1200, t: "Night", i: "" }, { b: "Dior", n: "Rouge", p: 380, t: "999", i: "" }, { b: "YSL", n: "Touche Eclat", p: 420, t: "Concealer", i: "" }, { b: "Lancome", n: "Teint Idole", p: 480, t: "Foundation", i: "" },
            { b: "SK-II", n: "Facial Treatment", p: 1680, t: "230ml", i: "" }, { b: "LaMer", n: "Soft Cream", p: 2800, t: "60ml", i: "" }, { b: "Kiehl's", n: "Ultra", p: 320, t: "Face", i: "" }, { b: "MAC", n: "Studio Fix", p: 220, t: "Powder", i: "" }, { b: "TomFord", n: "Lip Color", p: 450, t: "Velvet", i: "" },
            { b: "NARS", n: "Orgasm", p: 320, t: "Blush", i: "" }, { b: "CPB", n: "Cle de Peau", p: 1100, t: "Foundation", i: "" }, { b: "Guerlain", n: "Abeille", p: 680, t: "Royal", i: "" }, { b: "JoMalone", n: "Wood Sage", p: 680, t: "30ml", i: "" }, { b: "Diptyque", n: "Philosykos", p: 680, t: "75g", i: "" },
            { b: "Byredo", n: "Bal d'Afrique", p: 1380, t: "50ml", i: "" }, { b: "Aesop", n: "Resurrection", p: 420, t: "Hand", i: "" },
            { b: "Chanel", n: "N°5 L'Eau", p: 1200, t: "100ml", i: "" }, { b: "Estee", n: "Double Wear", p: 480, t: "Foundation", i: "" }, { b: "Dior", n: "Rouge Dior", p: 400, t: "999", i: "" }, { b: "YSL", n: "Libre", p: 680, t: "50ml", i: "" }, { b: "Lancome", n: "Teint Miracle", p: 520, t: "Foundation", i: "" },
            { b: "SK-II", n: "Facial Treatment Essence", p: 1780, t: "250ml", i: "" }, { b: "LaMer", n: "The Concentrate", p: 3200, t: "50ml", i: "" }, { b: "Kiehl's", n: "Ultra Facial", p: 360, t: "Cream", i: "" }, { b: "MAC", n: "Studio Fix Fluid", p: 240, t: "Foundation", i: "" }, { b: "TomFord", n: "Black Orchid", p: 850, t: "50ml", i: "" },
            { b: "NARS", n: "Radiant Creamy", p: 340, t: "Concealer", i: "" }, { b: "CPB", n: "The Foundation", p: 1200, t: "Radiant", i: "" }, { b: "Guerlain", n: "Abeille Royale", p: 780, t: "Royal", i: "" }, { b: "JoMalone", n: "Peony & Blush", p: 720, t: "30ml", i: "" },
            { b: "Diptyque", n: "Baies", p: 680, t: "190g", i: "" }, { b: "Byredo", n: "Gypsy Water", p: 1480, t: "50ml", i: "" }, { b: "Aesop", n: "Resurrection Aromatique", p: 480, t: "Hand", i: "" }, { b: "Clarins", n: "Double Serum", p: 580, t: "Body", i: "" }, { b: "Shiseido", n: "Ultimate Sun", p: 420, t: "Protector", i: "" },
            { b: "Biotherm", n: "Aqua Source", p: 480, t: "Gel", i: "" }, { b: "Chanel", n: "Coco Mademoiselle Intense", p: 1380, t: "100ml", i: "" }, { b: "Estee", n: "Advanced Night Repair", p: 1300, t: "Night", i: "" }, { b: "Dior", n: "Rouge Dior Ultra", p: 420, t: "999", i: "" }, { b: "YSL", n: "Touche Eclat Pro", p: 460, t: "Concealer", i: "" },
            { b: "Lancome", n: "Teint Idole Ultra", p: 520, t: "Foundation", i: "" }, { b: "SK-II", n: "Facial Treatment Essence Pro", p: 1880, t: "250ml", i: "" }, { b: "LaMer", n: "Soft Cream Pro", p: 3000, t: "60ml", i: "" }, { b: "Kiehl's", n: "Ultra Facial Pro", p: 380, t: "Face", i: "" }, { b: "MAC", n: "Studio Fix Powder Pro", p: 260, t: "Powder", i: "" },
            { b: "TomFord", n: "Lip Color Pro", p: 480, t: "Velvet", i: "" }, { b: "NARS", n: "Orgasm Pro", p: 360, t: "Blush", i: "" }, { b: "CPB", n: "Cle de Peau Pro", p: 1200, t: "Foundation", i: "" }, { b: "Guerlain", n: "Abeille Royale Pro", p: 780, t: "Royal", i: "" }, { b: "JoMalone", n: "Wood Sage & Sea Salt Pro", p: 720, t: "30ml", i: "" },
            { b: "Diptyque", n: "Philosykos Pro", p: 720, t: "75g", i: "" }, { b: "Byredo", n: "Bal d'Afrique Pro", p: 1580, t: "50ml", i: "" }, { b: "Aesop", n: "Resurrection Pro", p: 480, t: "Hand", i: "" }, { b: "Clarins", n: "Double Serum Pro", p: 620, t: "Body", i: "" }, { b: "Shiseido", n: "Ultimate Sun Pro", p: 460, t: "Protector", i: "" },
            { b: "Biotherm", n: "Aqua Source Pro", p: 520, t: "Gel", i: "" }, { b: "Chanel", n: "N°5 L'Eau Pro", p: 1300, t: "100ml", i: "" }, { b: "Estee", n: "Double Wear Pro", p: 520, t: "Foundation", i: "" }, { b: "Dior", n: "Rouge Dior Pro", p: 440, t: "999", i: "" }, { b: "YSL", n: "Libre Pro", p: 720, t: "50ml", i: "" },
            { b: "Lancome", n: "Teint Miracle Pro", p: 560, t: "Foundation", i: "" }, { b: "SK-II", n: "Facial Treatment Essence Elite", p: 1980, t: "250ml", i: "" }, { b: "LaMer", n: "The Concentrate Elite", p: 3400, t: "50ml", i: "" }, { b: "Kiehl's", n: "Ultra Facial Elite", p: 400, t: "Cream", i: "" }, { b: "MAC", n: "Studio Fix Fluid Elite", p: 280, t: "Foundation", i: "" },
            { b: "TomFord", n: "Black Orchid Elite", p: 950, t: "50ml", i: "" }, { b: "NARS", n: "Radiant Creamy Elite", p: 380, t: "Concealer", i: "" }, { b: "CPB", n: "The Foundation Elite", p: 1300, t: "Radiant", i: "" }, { b: "Guerlain", n: "Abeille Royale Elite", p: 880, t: "Royal", i: "" }, { b: "JoMalone", n: "Peony & Blush Elite", p: 780, t: "30ml", i: "" },
            { b: "Diptyque", n: "Baies Elite", p: 780, t: "190g", i: "" }, { b: "Byredo", n: "Gypsy Water Elite", p: 1580, t: "50ml", i: "" }, { b: "Aesop", n: "Resurrection Aromatique Elite", p: 520, t: "Hand", i: "" }, { b: "Clarins", n: "Double Serum Elite", p: 660, t: "Body", i: "" }, { b: "Shiseido", n: "Ultimate Sun Elite", p: 480, t: "Protector", i: "" },
            { b: "Biotherm", n: "Aqua Source Elite", p: 560, t: "Gel", i: "" },
            { b: "Chanel", n: "N°5 L'EAU", p: 1299, t: "100ml", i: "" }, { b: "Estee", n: "Advanced Night", p: 1280, t: "Repair", i: "" }, { b: "Dior", n: "Rouge Dior", p: 399, t: "999", i: "" }, { b: "YSL", n: "Touche Éclat", p: 399, t: "Concealer", i: "" },
            { b: "Lancome", n: "Teint Idole", p: 499, t: "Ultra", i: "" }, { b: "SK-II", n: "Facial Treatment", p: 1880, t: "Essence", i: "" }, { b: "LaMer", n: "Crème", p: 3200, t: "de la Mer", i: "" }, { b: "Kiehl's", n: "Ultra Facial", p: 399, t: "Cream", i: "" }, { b: "MAC", n: "Lipstick", p: 199, t: "Ruby Woo", i: "" },
            { b: "Bobbi", n: "Brown", p: 399, t: "Foundation", i: "" }, { b: "NARS", n: "Orgasm", p: 299, t: "Blush", i: "" }, { b: "Urban", n: "Decay", p: 399, t: "Naked", i: "" }, { b: "Too", n: "Faced", p: 399, t: "Better", i: "" }, { b: "Fenty", n: "Beauty", p: 299, t: "Pro", i: "" },
            { b: "Chanel", n: "Coco Mademoiselle", p: 1299, t: "100ml", i: "" }, { b: "Estee", n: "Double Wear", p: 499, t: "Stay-in-Place", i: "" }, { b: "Dior", n: "Sauvage", p: 899, t: "100ml", i: "" }, { b: "YSL", n: "Libre", p: 1299, t: "100ml", i: "" }, { b: "Lancome", n: "Idôle", p: 899, t: "100ml", i: "" },
            { b: "SK-II", n: "R.N.A.", p: 1280, t: "Power", i: "" }, { b: "LaMer", n: "The Concentrate", p: 4200, t: "50ml", i: "" }, { b: "Kiehl's", n: "Midnight Recovery", p: 599, t: "Oil", i: "" }, { b: "MAC", n: "Studio Fix", p: 399, t: "Powder", i: "" }, { b: "Bobbi", n: "Brown", p: 399, t: "Long-Wear", i: "" },
            { b: "NARS", n: "Radiant", p: 499, t: "Creamy", i: "" }, { b: "Urban", n: "Decay", p: 399, t: "All Nighter", i: "" }, { b: "Too", n: "Faced", p: 399, t: "Born This Way", i: "" }, { b: "Fenty", n: "Beauty", p: 299, t: "Gloss Bomb", i: "" }, { b: "Chanel", n: "Bleu", p: 899, t: "100ml", i: "" },
            { b: "Estee", n: "Perfecting", p: 399, t: "Primer", i: "" }, { b: "Dior", n: "Forever", p: 499, t: "Foundation", i: "" }, { b: "YSL", n: "All Hours", p: 499, t: "Foundation", i: "" }, { b: "Lancome", n: "Hypnôse", p: 399, t: "Mascara", i: "" }, { b: "SK-II", n: "GenOptics", p: 1280, t: "Aura", i: "" },
            { b: "LaMer", n: "The Treatment", p: 3200, t: "Lotion", i: "" }, { b: "Kiehl's", n: "Calendula", p: 299, t: "Toner", i: "" }, { b: "MAC", n: "Prep + Prime", p: 299, t: "Fix+", i: "" }, { b: "Bobbi", n: "Brown", p: 399, t: "Shimmer", i: "" }, { b: "NARS", n: "Laguna", p: 399, t: "Bronzer", i: "" },
            { b: "Urban", n: "Decay", p: 399, t: "Eyeshadow", i: "" }, { b: "Too", n: "Faced", p: 399, t: "Mascara", i: "" }, { b: "Fenty", n: "Beauty", p: 299, t: "Killawatt", i: "" }, { b: "Chanel", n: "Gabrielle", p: 1299, t: "100ml", i: "" }, { b: "Estee", n: "Pure Color", p: 299, t: "Envy", i: "" },
            { b: "Dior", n: "Addict", p: 399, t: "Lip Glow", i: "" }, { b: "YSL", n: "Volupté", p: 399, t: "Tint-in-Balm", i: "" }, { b: "Lancome", n: "L'Absolu", p: 399, t: "Rouge", i: "" }, { b: "SK-II", n: "Facial Treatment", p: 1880, t: "Mask", i: "" }, { b: "LaMer", n: "The Eye", p: 2200, t: "Concentrate", i: "" },
            { b: "Kiehl's", n: "Rare Earth", p: 399, t: "Deep Pore", i: "" }, { b: "MAC", n: "Fix+", p: 199, t: "Coconut", i: "" }, { b: "Bobbi", n: "Brown", p: 399, t: "Intensive", i: "" }, { b: "NARS", n: "Sheer Glow", p: 499, t: "Foundation", i: "" }, { b: "Urban", n: "Decay", p: 399, t: "Naked Heat", i: "" },
            { b: "Too", n: "Faced", p: 399, t: "Sweet Peach", i: "" }, { b: "Fenty", n: "Beauty", p: 299, t: "Match Stix", i: "" }, { b: "Chanel", n: "Chance", p: 899, t: "100ml", i: "" }, { b: "Estee", n: "Advanced Night", p: 1280, t: "Repair Eye", i: "" }, { b: "Dior", n: "Capture", p: 899, t: "Totale", i: "" }
        ],
        'fu': [
            { b: "IKEA", n: "Sofa", p: 2500, t: "Nordic", i: "" }, { b: "NITORI", n: "Mattress", p: 1800, t: "Soft", i: "" }, { b: "Herman", n: "Aeron", p: 8800, t: "Ergo", i: "" },
            { b: "Muji", n: "Bed", p: 3500, t: "Oak", i: "" }, { b: "Hay", n: "Chair", p: 1200, t: "About", i: "" }, { b: "Vitra", n: "Eames", p: 4500, t: "Lounge", i: "" }, { b: "Kartell", n: "Lamp", p: 1500, t: "Bourgie", i: "" }, { b: "Alessi", n: "Kettle", p: 900, t: "Bird", i: "" },
            { b: "FritzHansen", n: "Egg", p: 45000, t: "Classic", i: "" }, { b: "Knoll", n: "Table", p: 12000, t: "Saarinen", i: "" }, { b: "Cassina", n: "LC2", p: 32000, t: "LeCorbusier", i: "" }, { b: "Magis", n: "Stool", p: 2500, t: "Puppy", i: "" }, { b: "Flos", n: "Light", p: 3500, t: "Arco", i: "" },
            { b: "Artemide", n: "Tolomeo", p: 2200, t: "Desk", i: "" }, { b: "Dyson", n: "Light", p: 4200, t: "Solar", i: "" }, { b: "Tempur", n: "Pillow", p: 900, t: "Memory", i: "" }, { b: "Simmons", n: "Mattress", p: 15000, t: "Beauty", i: "" }, { b: "Sealy", n: "Bed", p: 12000, t: "Posture", i: "" }, { b: "Ashley", n: "Recliner", p: 3500, t: "Lazy", i: "" }, { b: "LaZBoy", n: "Chair", p: 4500, t: "Comfort", i: "" },
            { b: "IKEA", n: "Pax", p: 2800, t: "Wardrobe", i: "" }, { b: "NITORI", n: "Dining Table", p: 2200, t: "Wood", i: "" }, { b: "Herman", n: "Sayl", p: 4200, t: "Ergo", i: "" }, { b: "Muji", n: "Shelf", p: 888, t: "Oak", i: "" }, { b: "Hay", n: "About", p: 1500, t: "Stool", i: "" },
            { b: "Vitra", n: "Eames", p: 5200, t: "Lounge", i: "" }, { b: "Kartell", n: "Bourgie", p: 1800, t: "Lamp", i: "" }, { b: "Alessi", n: "Juicy Salif", p: 1200, t: "Squeezer", i: "" }, { b: "FritzHansen", n: "Series 7", p: 2800, t: "Chair", i: "" }, { b: "Knoll", n: "Womb", p: 8800, t: "Chair", i: "" },
            { b: "Cassina", n: "LC4", p: 28000, t: "Chaise", i: "" }, { b: "Magis", n: "Chair One", p: 3200, t: "Plastic", i: "" }, { b: "Flos", n: "Ara", p: 4200, t: "Table", i: "" }, { b: "Artemide", n: "Tizio", p: 2800, t: "Desk", i: "" }, { b: "Dyson", n: "Cool", p: 3800, t: "Fan", i: "" },
            { b: "Tempur", n: "Cloud", p: 1200, t: "Pillow", i: "" }, { b: "Simmons", n: "Beautyrest", p: 18000, t: "Black", i: "" }, { b: "Sealy", n: "Posturepedic", p: 15000, t: "Plus", i: "" },
            { b: "IKEA", n: "Malm", p: 1200, t: "Bed Frame", i: "" }, { b: "NITORI", n: "Sofa Bed", p: 2800, t: "Convertible", i: "" }, { b: "Herman", n: "Embody", p: 12000, t: "Ergo", i: "" }, { b: "Muji", n: "Sofa", p: 4500, t: "Oak", i: "" }, { b: "Hay", n: "About A Chair", p: 1500, t: "Stool", i: "" },
            { b: "Vitra", n: "Eames Lounge", p: 5500, t: "Chair", i: "" }, { b: "Kartell", n: "Bourgie Lamp", p: 1800, t: "LED", i: "" }, { b: "Alessi", n: "Juicy Salif", p: 1300, t: "Squeezer", i: "" }, { b: "FritzHansen", n: "Series 7 Chair", p: 3000, t: "Classic", i: "" }, { b: "Knoll", n: "Womb Chair", p: 9500, t: "Comfort", i: "" },
            { b: "Cassina", n: "LC4 Chaise", p: 30000, t: "Longue", i: "" }, { b: "Magis", n: "Chair One Pro", p: 3500, t: "Plastic", i: "" }, { b: "Flos", n: "Ara Table Lamp", p: 4500, t: "Table", i: "" }, { b: "Artemide", n: "Tizio Desk Lamp", p: 3000, t: "Desk", i: "" }, { b: "Dyson", n: "Cool Fan Pro", p: 4000, t: "Fan", i: "" },
            { b: "Tempur", n: "Cloud Pro", p: 1400, t: "Pillow", i: "" }, { b: "Simmons", n: "Beautyrest Pro", p: 20000, t: "Black", i: "" }, { b: "Sealy", n: "Posturepedic Pro", p: 17000, t: "Plus", i: "" }, { b: "IKEA", n: "Hemnes", p: 1500, t: "Bed Frame", i: "" }, { b: "NITORI", n: "Sofa Bed Pro", p: 3200, t: "Convertible", i: "" },
            { b: "Herman", n: "Sayl Pro", p: 4800, t: "Ergo", i: "" }, { b: "Muji", n: "Sofa Pro", p: 5200, t: "Oak", i: "" }, { b: "Hay", n: "About A Chair Pro", p: 1800, t: "Stool", i: "" }, { b: "Vitra", n: "Eames Lounge Pro", p: 6200, t: "Chair", i: "" }, { b: "Kartell", n: "Bourgie Lamp Pro", p: 2100, t: "LED", i: "" },
            { b: "Alessi", n: "Juicy Salif Pro", p: 1500, t: "Squeezer", i: "" }, { b: "FritzHansen", n: "Series 7 Chair Pro", p: 3500, t: "Classic", i: "" }, { b: "Knoll", n: "Womb Chair Pro", p: 10500, t: "Comfort", i: "" }, { b: "Cassina", n: "LC4 Chaise Pro", p: 32000, t: "Longue", i: "" }, { b: "Magis", n: "Chair One Elite", p: 4000, t: "Plastic", i: "" },
            { b: "Flos", n: "Ara Table Lamp Elite", p: 5000, t: "Table", i: "" }, { b: "Artemide", n: "Tizio Desk Lamp Elite", p: 3500, t: "Desk", i: "" }, { b: "Dyson", n: "Cool Fan Elite", p: 4500, t: "Fan", i: "" }, { b: "Tempur", n: "Cloud Elite", p: 1600, t: "Pillow", i: "" }, { b: "Simmons", n: "Beautyrest Elite", p: 22000, t: "Black", i: "" },
            { b: "Sealy", n: "Posturepedic Elite", p: 19000, t: "Plus", i: "" }, { b: "IKEA", n: "Brimnes", p: 1800, t: "Bed Frame", i: "" }, { b: "NITORI", n: "Sofa Bed Elite", p: 3600, t: "Convertible", i: "" }, { b: "Herman", n: "Sayl Elite", p: 5400, t: "Ergo", i: "" }, { b: "Muji", n: "Sofa Elite", p: 5800, t: "Oak", i: "" },
            { b: "Hay", n: "About A Chair Elite", p: 2100, t: "Stool", i: "" }, { b: "Vitra", n: "Eames Lounge Elite", p: 6800, t: "Chair", i: "" }, { b: "Kartell", n: "Bourgie Lamp Elite", p: 2400, t: "LED", i: "" }, { b: "Alessi", n: "Juicy Salif Elite", p: 1700, t: "Squeezer", i: "" }, { b: "FritzHansen", n: "Series 7 Chair Elite", p: 4000, t: "Classic", i: "" },
            { b: "Knoll", n: "Womb Chair Elite", p: 11500, t: "Comfort", i: "" }, { b: "Cassina", n: "LC4 Chaise Elite", p: 34000, t: "Longue", i: "" }, { b: "Magis", n: "Chair One Max", p: 4500, t: "Plastic", i: "" }, { b: "Flos", n: "Ara Table Lamp Max", p: 5500, t: "Table", i: "" }, { b: "Artemide", n: "Tizio Desk Lamp Max", p: 4000, t: "Desk", i: "" },
            { b: "Dyson", n: "Cool Fan Max", p: 5000, t: "Fan", i: "" }, { b: "Tempur", n: "Cloud Max", p: 1800, t: "Pillow", i: "" }, { b: "Simmons", n: "Beautyrest Max", p: 24000, t: "Black", i: "" }, { b: "Sealy", n: "Posturepedic Max", p: 21000, t: "Plus", i: "" }, { b: "IKEA", n: "Koppang", p: 2000, t: "Bed Frame", i: "" },
            { b: "NITORI", n: "Sofa Bed Max", p: 4000, t: "Convertible", i: "" }, { b: "Herman", n: "Sayl Max", p: 6000, t: "Ergo", i: "" }, { b: "Muji", n: "Sofa Max", p: 6400, t: "Oak", i: "" }, { b: "Hay", n: "About A Chair Max", p: 2400, t: "Stool", i: "" }, { b: "Vitra", n: "Eames Lounge Max", p: 7500, t: "Chair", i: "" },
            { b: "Kartell", n: "Bourgie Lamp Max", p: 2700, t: "LED", i: "" }, { b: "Alessi", n: "Juicy Salif Max", p: 1900, t: "Squeezer", i: "" }, { b: "FritzHansen", n: "Series 7 Chair Max", p: 4500, t: "Classic", i: "" }, { b: "Knoll", n: "Womb Chair Max", p: 12500, t: "Comfort", i: "" }, { b: "Cassina", n: "LC4 Chaise Max", p: 36000, t: "Longue", i: "" },
            { b: "Magis", n: "Chair One Ultra", p: 5000, t: "Plastic", i: "" }, { b: "Flos", n: "Ara Table Lamp Ultra", p: 6000, t: "Table", i: "" }, { b: "Artemide", n: "Tizio Desk Lamp Ultra", p: 4500, t: "Desk", i: "" }, { b: "Dyson", n: "Cool Fan Ultra", p: 5500, t: "Fan", i: "" }, { b: "Tempur", n: "Cloud Ultra", p: 2000, t: "Pillow", i: "" },
            { b: "Simmons", n: "Beautyrest Ultra", p: 26000, t: "Black", i: "" }, { b: "Sealy", n: "Posturepedic Ultra", p: 23000, t: "Plus", i: "" },
            { b: "IKEA", n: "HEMNES", p: 2999, t: "Bed", i: "" }, { b: "NITORI", n: "Memory Foam", p: 2800, t: "Mattress", i: "" }, { b: "Herman", n: "Miller", p: 10800, t: "Embody", i: "" }, { b: "Muji", n: "Oak Bed", p: 4200, t: "Frame", i: "" }, { b: "Hay", n: "About A", p: 1500, t: "Chair", i: "" },
            { b: "Vitra", n: "Eames", p: 5800, t: "Lounge", i: "" }, { b: "Kartell", n: "Bourgie", p: 1800, t: "Lamp", i: "" }, { b: "Alessi", n: "Bird", p: 1200, t: "Kettle", i: "" }, { b: "IKEA", n: "POÄNG", p: 899, t: "Chair", i: "" }, { b: "NITORI", n: "Sofa", p: 3800, t: "3-Seater", i: "" },
            { b: "Herman", n: "Miller", p: 12800, t: "Sayl", i: "" }, { b: "Muji", n: "Sofa", p: 4800, t: "Bed", i: "" }, { b: "Hay", n: "Mags", p: 899, t: "Sofa", i: "" }, { b: "Vitra", n: "Panton", p: 2800, t: "Chair", i: "" }, { b: "Kartell", n: "Componibili", p: 1200, t: "Storage", i: "" },
            { b: "Alessi", n: "Juicy Salif", p: 899, t: "Squeezer", i: "" }, { b: "IKEA", n: "MALM", p: 1299, t: "Bed", i: "" }, { b: "NITORI", n: "Dining", p: 2800, t: "Table", i: "" }, { b: "Herman", n: "Miller", p: 9800, t: "Setu", i: "" }, { b: "Muji", n: "Dining", p: 3200, t: "Table", i: "" },
            { b: "Hay", n: "Palissade", p: 1800, t: "Outdoor", i: "" }, { b: "Vitra", n: "Eames", p: 4200, t: "DSW", i: "" }, { b: "Kartell", n: "Masters", p: 1500, t: "Chair", i: "" }, { b: "Alessi", n: "9091", p: 699, t: "Kettle", i: "" }, { b: "IKEA", n: "BILLY", p: 599, t: "Bookcase", i: "" },
            { b: "NITORI", n: "Wardrobe", p: 3200, t: "4-Door", i: "" }, { b: "Herman", n: "Miller", p: 8800, t: "Cosm", i: "" }, { b: "Muji", n: "Storage", p: 899, t: "System", i: "" }, { b: "Hay", n: "Tray", p: 399, t: "Table", i: "" }, { b: "Vitra", n: "Eames", p: 3200, t: "RAR", i: "" },
            { b: "Kartell", n: "Bookworm", p: 899, t: "Shelf", i: "" }, { b: "Alessi", n: "Moka", p: 399, t: "Express", i: "" }, { b: "IKEA", n: "KALLAX", p: 499, t: "Shelf", i: "" }, { b: "NITORI", n: "Coffee", p: 899, t: "Table", i: "" }, { b: "Herman", n: "Miller", p: 10800, t: "Mirra", i: "" },
            { b: "Muji", n: "Shelf", p: 599, t: "Unit", i: "" }, { b: "Hay", n: "PC Portable", p: 699, t: "Desk", i: "" }, { b: "Vitra", n: "Eames", p: 2800, t: "DSR", i: "" }, { b: "Kartell", n: "Louis", p: 1200, t: "Ghost", i: "" }, { b: "Alessi", n: "Pulcina", p: 599, t: "Kettle", i: "" },
            { b: "IKEA", n: "STRANDMON", p: 1999, t: "Wing", i: "" }, { b: "NITORI", n: "Recliner", p: 2800, t: "Chair", i: "" }, { b: "Herman", n: "Miller", p: 12800, t: "Verus", i: "" }, { b: "Muji", n: "Sofa", p: 4200, t: "Bed", i: "" }, { b: "Hay", n: "About A", p: 1500, t: "Stool", i: "" },
            { b: "Vitra", n: "Eames", p: 4800, t: "LCW", i: "" }, { b: "Kartell", n: "Battery", p: 1200, t: "Table", i: "" }, { b: "Alessi", n: "9093", p: 899, t: "Kettle", i: "" }, { b: "IKEA", n: "EKEDALEN", p: 1299, t: "Extendable", i: "" }, { b: "NITORI", n: "Dining", p: 3200, t: "Set", i: "" },
            { b: "Herman", n: "Miller", p: 11800, t: "Lino", i: "" }, { b: "Muji", n: "Sofa", p: 4800, t: "Bed", i: "" }, { b: "Hay", n: "About A", p: 1500, t: "Side", i: "" }, { b: "Vitra", n: "Eames", p: 3800, t: "DSX", i: "" }, { b: "Kartell", n: "Fly", p: 1200, t: "Lamp", i: "" },
            { b: "Alessi", n: "9090", p: 699, t: "Kettle", i: "" }, { b: "IKEA", n: "FRIHETEN", p: 3999, t: "Corner", i: "" }, { b: "NITORI", n: "Sofa", p: 4200, t: "Bed", i: "" }, { b: "Herman", n: "Miller", p: 10800, t: "Celle", i: "" }, { b: "Muji", n: "Sofa", p: 4800, t: "Bed", i: "" }
        ],
        'bk': [
            { b: "人民文学", n: "三体", p: 89, t: "科幻", i: "" }, { b: "作家出版社", n: "活着", p: 45, t: "文学", i: "" }, { b: "上海译文", n: "百年孤独", p: 55, t: "外国文学", i: "" }, { b: "中信出版", n: "人类简史", p: 68, t: "历史", i: "" },
            { b: "商务印书馆", n: "新华字典", p: 25, t: "工具书", i: "" }, { b: "清华大学", n: "算法导论", p: 128, t: "计算机", i: "" }, { b: "机械工业", n: "深度学习", p: 118, t: "AI", i: "" }, { b: "电子工业", n: "Python编程", p: 79, t: "编程", i: "" },
            { b: "人民邮电", n: "设计心理学", p: 65, t: "设计", i: "" }, { b: "中华书局", n: "史记", p: 198, t: "古籍", i: "" }, { b: "北京大学", n: "经济学原理", p: 88, t: "经济", i: "" }, { b: "高等教育", n: "线性代数", p: 42, t: "数学", i: "" },
            { b: "外研社", n: "新概念英语", p: 35, t: "英语", i: "" }, { b: "童趣出版", n: "小王子", p: 28, t: "童书", i: "" }, { b: "接力出版", n: "哈利波特", p: 158, t: "魔幻", i: "" }, { b: "湖南文艺", n: "平凡的世界", p: 98, t: "现代文学", i: "" },
            { b: "浙江文艺", n: "围城", p: 38, t: "经典", i: "" }, { b: "译林出版", n: "追风筝的人", p: 42, t: "外国小说", i: "" }, { b: "广西师大", n: "理想国", p: 58, t: "哲学", i: "" }, { b: "三联书店", n: "万历十五年", p: 48, t: "历史", i: "" },
            { b: "中国青年", n: "苏菲的世界", p: 45, t: "哲学入门", i: "" }, { b: "人民文学", n: "红楼梦", p: 128, t: "古典名著", i: "" }, { b: "岳麓书社", n: "西游记", p: 68, t: "古典", i: "" }, { b: "中国文联", n: "唐诗三百首", p: 32, t: "诗词", i: "" },
            { b: "北京联合", n: "解忧杂货店", p: 48, t: "治愈系", i: "" }, { b: "南海出版", n: "白夜行", p: 58, t: "推理", i: "" }, { b: "新星出版", n: "挪威的森林", p: 42, t: "文艺", i: "" }, { b: "上海人民", n: "资本论", p: 168, t: "政治经济", i: "" },
            { b: "法律出版", n: "民法典", p: 88, t: "法律", i: "" }, { b: "科学出版", n: "时间简史", p: 58, t: "科普", i: "" }, { b: "化学工业", n: "营养圣经", p: 78, t: "健康", i: "" }, { b: "人民卫生", n: "本草纲目", p: 128, t: "中医", i: "" },
            { b: "中国建筑", n: "建筑的故事", p: 98, t: "建筑", i: "" }, { b: "中国美术", n: "艺术的故事", p: 188, t: "艺术", i: "" }, { b: "音乐出版", n: "音乐理论", p: 68, t: "音乐", i: "" }, { b: "体育大学", n: "运动生理学", p: 88, t: "体育", i: "" },
            { b: "旅游教育", n: "孤独星球", p: 128, t: "旅行", i: "" }, { b: "中国地图", n: "世界地图集", p: 158, t: "地理", i: "" }, { b: "天文出版", n: "观星指南", p: 78, t: "天文", i: "" }, { b: "海洋出版", n: "海洋生物", p: 98, t: "海洋", i: "" },
            { b: "人民文学", n: "三体2", p: 99, t: "科幻", i: "" }, { b: "作家出版社", n: "许三观卖血记", p: 48, t: "文学", i: "" }, { b: "上海译文", n: "1984", p: 58, t: "外国文学", i: "" }, { b: "中信出版", n: "未来简史", p: 72, t: "历史", i: "" }, { b: "商务印书馆", n: "现代汉语词典", p: 88, t: "工具书", i: "" },
            { b: "清华大学", n: "数据结构", p: 138, t: "计算机", i: "" }, { b: "机械工业", n: "机器学习", p: 128, t: "AI", i: "" }, { b: "电子工业", n: "Java编程", p: 89, t: "编程", i: "" }, { b: "人民邮电", n: "用户体验设计", p: 75, t: "设计", i: "" }, { b: "中华书局", n: "资治通鉴", p: 228, t: "古籍", i: "" },
            { b: "北京大学", n: "宏观经济学", p: 98, t: "经济", i: "" }, { b: "高等教育", n: "高等数学", p: 52, t: "数学", i: "" }, { b: "外研社", n: "新概念英语2", p: 45, t: "英语", i: "" }, { b: "童趣出版", n: "小王子2", p: 38, t: "童书", i: "" }, { b: "接力出版", n: "哈利波特2", p: 168, t: "魔幻", i: "" },
            { b: "湖南文艺", n: "白鹿原", p: 108, t: "现代文学", i: "" }, { b: "浙江文艺", n: "我们仨", p: 48, t: "经典", i: "" }, { b: "译林出版", n: "追风筝的人2", p: 52, t: "外国小说", i: "" }, { b: "广西师大", n: "理想国2", p: 68, t: "哲学", i: "" }, { b: "三联书店", n: "万历十六年", p: 58, t: "历史", i: "" },
            { b: "中国青年", n: "苏菲的世界2", p: 55, t: "哲学入门", i: "" }, { b: "人民文学", n: "水浒传", p: 138, t: "古典名著", i: "" }, { b: "岳麓书社", n: "三国演义", p: 78, t: "古典", i: "" }, { b: "中国文联", n: "宋词三百首", p: 42, t: "诗词", i: "" }, { b: "北京联合", n: "解忧杂货店2", p: 58, t: "治愈系", i: "" },
            { b: "南海出版", n: "白夜行2", p: 68, t: "推理", i: "" }, { b: "新星出版", n: "挪威的森林2", p: 52, t: "文艺", i: "" }, { b: "上海人民", n: "资本论2", p: 188, t: "政治经济", i: "" }, { b: "法律出版", n: "民法典2", p: 98, t: "法律", i: "" }, { b: "科学出版", n: "时间简史2", p: 68, t: "科普", i: "" },
            { b: "化学工业", n: "营养圣经2", p: 88, t: "健康", i: "" }, { b: "人民卫生", n: "本草纲目2", p: 148, t: "中医", i: "" }, { b: "中国建筑", n: "建筑的故事2", p: 108, t: "建筑", i: "" }, { b: "中国美术", n: "艺术的故事2", p: 208, t: "艺术", i: "" }, { b: "音乐出版", n: "音乐理论2", p: 78, t: "音乐", i: "" },
            { b: "体育大学", n: "运动生理学2", p: 98, t: "体育", i: "" }, { b: "旅游教育", n: "孤独星球2", p: 148, t: "旅行", i: "" }, { b: "中国地图", n: "世界地图集2", p: 178, t: "地理", i: "" }, { b: "天文出版", n: "观星指南2", p: 88, t: "天文", i: "" }, { b: "海洋出版", n: "海洋生物2", p: 108, t: "海洋", i: "" },
            { b: "人民文学", n: "三体3", p: 109, t: "科幻", i: "" }, { b: "作家出版社", n: "兄弟", p: 58, t: "文学", i: "" }, { b: "上海译文", n: "动物农场", p: 68, t: "外国文学", i: "" }, { b: "中信出版", n: "今日简史", p: 82, t: "历史", i: "" }, { b: "商务印书馆", n: "古汉语词典", p: 98, t: "工具书", i: "" },
            { b: "清华大学", n: "操作系统", p: 148, t: "计算机", i: "" }, { b: "机械工业", n: "神经网络", p: 138, t: "AI", i: "" }, { b: "电子工业", n: "C++编程", p: 99, t: "编程", i: "" }, { b: "人民邮电", n: "交互设计", p: 85, t: "设计", i: "" }, { b: "中华书局", n: "论语", p: 248, t: "古籍", i: "" },
            { b: "北京大学", n: "微观经济学", p: 108, t: "经济", i: "" }, { b: "高等教育", n: "概率论", p: 62, t: "数学", i: "" }, { b: "外研社", n: "新概念英语3", p: 55, t: "英语", i: "" }, { b: "童趣出版", n: "小王子3", p: 48, t: "童书", i: "" }, { b: "接力出版", n: "哈利波特3", p: 178, t: "魔幻", i: "" },
            { b: "湖南文艺", n: "平凡的世界2", p: 118, t: "现代文学", i: "" }, { b: "浙江文艺", n: "我们仨2", p: 58, t: "经典", i: "" }, { b: "译林出版", n: "追风筝的人3", p: 62, t: "外国小说", i: "" }, { b: "广西师大", n: "理想国3", p: 78, t: "哲学", i: "" }, { b: "三联书店", n: "万历十七年", p: 68, t: "历史", i: "" },
            { b: "中国青年", n: "苏菲的世界3", p: 65, t: "哲学入门", i: "" }, { b: "人民文学", n: "三国演义", p: 148, t: "古典名著", i: "" }, { b: "岳麓书社", n: "红楼梦", p: 88, t: "古典", i: "" }, { b: "中国文联", n: "元曲三百首", p: 52, t: "诗词", i: "" }, { b: "北京联合", n: "解忧杂货店3", p: 68, t: "治愈系", i: "" },
            { b: "南海出版", n: "白夜行3", p: 78, t: "推理", i: "" }, { b: "新星出版", n: "挪威的森林3", p: 62, t: "文艺", i: "" }, { b: "上海人民", n: "资本论3", p: 198, t: "政治经济", i: "" }, { b: "法律出版", n: "民法典3", p: 108, t: "法律", i: "" }, { b: "科学出版", n: "时间简史3", p: 78, t: "科普", i: "" },
            { b: "化学工业", n: "营养圣经3", p: 98, t: "健康", i: "" }, { b: "人民卫生", n: "本草纲目3", p: 158, t: "中医", i: "" }, { b: "中国建筑", n: "建筑的故事3", p: 118, t: "建筑", i: "" }, { b: "中国美术", n: "艺术的故事3", p: 218, t: "艺术", i: "" }, { b: "音乐出版", n: "音乐理论3", p: 88, t: "音乐", i: "" },
            { b: "体育大学", n: "运动生理学3", p: 108, t: "体育", i: "" }, { b: "旅游教育", n: "孤独星球3", p: 158, t: "旅行", i: "" }, { b: "中国地图", n: "世界地图集3", p: 188, t: "地理", i: "" }, { b: "天文出版", n: "观星指南3", p: 98, t: "天文", i: "" }, { b: "海洋出版", n: "海洋生物3", p: 118, t: "海洋", i: "" },
            { b: "人民文学", n: "平凡的世界", p: 99, t: "文学", i: "" }, { b: "作家出版社", n: "白夜行", p: 68, t: "悬疑", i: "" }, { b: "上海译文", n: "1984", p: 45, t: "外国文学", i: "" }, { b: "中信出版", n: "未来简史", p: 78, t: "历史", i: "" }, { b: "商务印书馆", n: "现代汉语词典", p: 88, t: "工具书", i: "" },
            { b: "清华大学", n: "数据结构", p: 138, t: "计算机", i: "" }, { b: "机械工业", n: "机器学习", p: 128, t: "AI", i: "" }, { b: "电子工业", n: "Java编程", p: 89, t: "编程", i: "" }, { b: "人民邮电", n: "Python", p: 79, t: "编程", i: "" }, { b: "北京大学出版社", n: "高等数学", p: 68, t: "数学", i: "" },
            { b: "高等教育", n: "线性代数", p: 58, t: "数学", i: "" }, { b: "化学工业", n: "有机化学", p: 78, t: "化学", i: "" }, { b: "科学出版社", n: "物理学", p: 88, t: "物理", i: "" }, { b: "外语教学", n: "新概念英语", p: 68, t: "英语", i: "" }, { b: "人民教育", n: "语文", p: 48, t: "教材", i: "" },
            { b: "人民文学", n: "围城", p: 55, t: "文学", i: "" }, { b: "作家出版社", n: "解忧杂货店", p: 58, t: "小说", i: "" }, { b: "上海译文", n: "百年孤独", p: 65, t: "外国文学", i: "" }, { b: "中信出版", n: "今日简史", p: 88, t: "历史", i: "" }, { b: "商务印书馆", n: "牛津高阶", p: 128, t: "英语", i: "" },
            { b: "清华大学", n: "算法设计", p: 148, t: "计算机", i: "" }, { b: "机械工业", n: "深度学习", p: 138, t: "AI", i: "" }, { b: "电子工业", n: "C++编程", p: 99, t: "编程", i: "" }, { b: "人民邮电", n: "JavaScript", p: 89, t: "编程", i: "" }, { b: "北京大学出版社", n: "概率论", p: 78, t: "数学", i: "" },
            { b: "高等教育", n: "微积分", p: 68, t: "数学", i: "" }, { b: "化学工业", n: "无机化学", p: 88, t: "化学", i: "" }, { b: "科学出版社", n: "量子力学", p: 98, t: "物理", i: "" }, { b: "外语教学", n: "英语语法", p: 58, t: "英语", i: "" }, { b: "人民教育", n: "数学", p: 38, t: "教材", i: "" },
            { b: "人民文学", n: "红楼梦", p: 128, t: "古典", i: "" }, { b: "作家出版社", n: "嫌疑人X", p: 68, t: "悬疑", i: "" }, { b: "上海译文", n: "追风筝的人", p: 55, t: "外国文学", i: "" }, { b: "中信出版", n: "人类简史", p: 88, t: "历史", i: "" }, { b: "商务印书馆", n: "朗文当代", p: 138, t: "英语", i: "" },
            { b: "清华大学", n: "操作系统", p: 158, t: "计算机", i: "" }, { b: "机械工业", n: "神经网络", p: 148, t: "AI", i: "" }, { b: "电子工业", n: "Go语言", p: 109, t: "编程", i: "" }, { b: "人民邮电", n: "React", p: 99, t: "编程", i: "" }, { b: "北京大学出版社", n: "统计学", p: 88, t: "数学", i: "" },
            { b: "高等教育", n: "离散数学", p: 78, t: "数学", i: "" }, { b: "化学工业", n: "分析化学", p: 98, t: "化学", i: "" }, { b: "科学出版社", n: "相对论", p: 108, t: "物理", i: "" }, { b: "外语教学", n: "英语词汇", p: 68, t: "英语", i: "" }, { b: "人民教育", n: "物理", p: 48, t: "教材", i: "" },
            { b: "人民文学", n: "西游记", p: 118, t: "古典", i: "" }, { b: "作家出版社", n: "恶意", p: 58, t: "悬疑", i: "" }, { b: "上海译文", n: "小王子", p: 35, t: "外国文学", i: "" }, { b: "中信出版", n: "时间简史", p: 78, t: "历史", i: "" }, { b: "商务印书馆", n: "柯林斯", p: 128, t: "英语", i: "" }
        ],
        'fit': [
            { b: "Nike", n: "哑铃套装", p: 299, t: "5-20kg", i: "" }, { b: "Adidas", n: "瑜伽垫", p: 128, t: "加厚", i: "" }, { b: "Reebok", n: "跑步机", p: 3200, t: "家用", i: "" }, { b: "UnderArmour", n: "健身手套", p: 88, t: "防滑", i: "" },
            { b: "Lululemon", n: "运动裤", p: 680, t: "速干", i: "" }, { b: "Puma", n: "跳绳", p: 45, t: "专业", i: "" }, { b: "Decathlon", n: "臂力器", p: 68, t: "可调节", i: "" }, { b: "Keep", n: "弹力带", p: 58, t: "阻力", i: "" },
            { b: "李宁", n: "篮球", p: 158, t: "7号", i: "" }, { b: "安踏", n: "足球", p: 128, t: "5号", i: "" }, { b: "361°", n: "羽毛球拍", p: 288, t: "碳素", i: "" }, { b: "红双喜", n: "乒乓球拍", p: 168, t: "专业", i: "" },
            { b: "Wilson", n: "网球拍", p: 588, t: "碳纤维", i: "" }, { b: "Yonex", n: "羽毛球", p: 88, t: "12只装", i: "" }, { b: "Spalding", n: "篮球架", p: 1288, t: "标准", i: "" }, { b: "Molten", n: "排球", p: 158, t: "比赛用", i: "" },
            { b: "迪卡侬", n: "动感单车", p: 1580, t: "静音", i: "" }, { b: "舒华", n: "椭圆机", p: 2380, t: "磁控", i: "" }, { b: "英派斯", n: "划船机", p: 1880, t: "水阻", i: "" }, { b: "乔山", n: "综合训练器", p: 3680, t: "多功能", i: "" },
            { b: "海德", n: "壶铃", p: 188, t: "铸铁", i: "" }, { b: "锐步", n: "杠铃", p: 688, t: "奥杆", i: "" }, { b: "麦瑞克", n: "卧推凳", p: 588, t: "可调", i: "" }, { b: "汉臣", n: "史密斯机", p: 4880, t: "商用", i: "" },
            { b: "泰诺健", n: "力量架", p: 5680, t: "深蹲架", i: "" }, { b: "必确", n: "龙门架", p: 8800, t: "专业", i: "" }, { b: "星驰", n: "健腹轮", p: 68, t: "自动回弹", i: "" }, { b: "凯速", n: "俯卧撑架", p: 58, t: "防滑", i: "" },
            { b: "悦步", n: "踏步机", p: 388, t: "静音", i: "" }, { b: "亿健", n: "按摩筋膜枪", p: 488, t: "深层", i: "" }, { b: "云麦", n: "体脂秤", p: 158, t: "智能", i: "" }, { b: "小米", n: "运动手环", p: 199, t: "心率", i: "" },
            { b: "佳明", n: "GPS手表", p: 1880, t: "跑步", i: "" }, { b: "颂拓", n: "户外手表", p: 2680, t: "登山", i: "" }, { b: "宜准", n: "计步器", p: 88, t: "3D", i: "" }, { b: "迈欧", n: "心率带", p: 288, t: "蓝牙", i: "" },
            { b: "速比涛", n: "泳镜", p: 188, t: "防雾", i: "" }, { b: "阿瑞娜", n: "泳帽", p: 58, t: "硅胶", i: "" }, { b: "洲克", n: "游泳圈", p: 68, t: "成人", i: "" }, { b: "拓胜", n: "浮板", p: 48, t: "训练", i: "" },
            { b: "Nike", n: "Free", p: 599, t: "Training", i: "" }, { b: "Adidas", n: "Ultraboost", p: 1299, t: "22", i: "" }, { b: "Reebok", n: "Nano X4", p: 799, t: "Crossfit", i: "" }, { b: "UnderArmour", n: "HOVR", p: 899, t: "Running", i: "" }, { b: "Lululemon", n: "Fast & Free", p: 880, t: "Leggings", i: "" },
            { b: "Puma", n: "Speedcat", p: 499, t: "Racing", i: "" }, { b: "Decathlon", n: "Kalenji", p: 199, t: "Running", i: "" }, { b: "Keep", n: "Yoga Mat", p: 88, t: "Premium", i: "" }, { b: "李宁", n: "韦德", p: 699, t: "Basketball", i: "" }, { b: "安踏", n: "KT", p: 599, t: "Basketball", i: "" },
            { b: "361°", n: "Spire", p: 499, t: "Running", i: "" }, { b: "红双喜", n: "DHS", p: 188, t: "Professional", i: "" }, { b: "Wilson", n: "Blade", p: 688, t: "Tennis", i: "" }, { b: "Yonex", n: "Astrox", p: 888, t: "Badminton", i: "" }, { b: "Spalding", n: "TF-1000", p: 388, t: "Basketball", i: "" },
            { b: "Molten", n: "V5M5000", p: 188, t: "Volleyball", i: "" }, { b: "迪卡侬", n: "Quechua", p: 288, t: "Hiking", i: "" },
            { b: "Nike", n: "哑铃套装 Pro", p: 399, t: "10-30kg", i: "" }, { b: "Adidas", n: "瑜伽垫 Pro", p: 188, t: "加厚", i: "" }, { b: "Reebok", n: "跑步机 Pro", p: 3800, t: "家用", i: "" }, { b: "UnderArmour", n: "健身手套 Pro", p: 128, t: "防滑", i: "" }, { b: "Lululemon", n: "运动裤 Pro", p: 780, t: "速干", i: "" },
            { b: "Puma", n: "跳绳 Pro", p: 65, t: "专业", i: "" }, { b: "Decathlon", n: "臂力器 Pro", p: 88, t: "可调节", i: "" }, { b: "Keep", n: "弹力带 Pro", p: 78, t: "阻力", i: "" }, { b: "李宁", n: "篮球 Pro", p: 198, t: "7号", i: "" }, { b: "安踏", n: "足球 Pro", p: 158, t: "5号", i: "" },
            { b: "361°", n: "羽毛球拍 Pro", p: 338, t: "碳素", i: "" }, { b: "红双喜", n: "乒乓球拍 Pro", p: 198, t: "专业", i: "" }, { b: "Wilson", n: "网球拍 Pro", p: 688, t: "碳纤维", i: "" }, { b: "Yonex", n: "羽毛球 Pro", p: 108, t: "12只装", i: "" },
            { b: "Spalding", n: "篮球架 Pro", p: 1488, t: "标准", i: "" }, { b: "Molten", n: "排球 Pro", p: 188, t: "比赛用", i: "" }, { b: "迪卡侬", n: "动感单车 Pro", p: 1880, t: "静音", i: "" }, { b: "舒华", n: "椭圆机 Pro", p: 2680, t: "磁控", i: "" }, { b: "英派斯", n: "划船机 Pro", p: 2180, t: "水阻", i: "" },
            { b: "乔山", n: "综合训练器 Pro", p: 4080, t: "多功能", i: "" }, { b: "海德", n: "壶铃 Pro", p: 228, t: "铸铁", i: "" }, { b: "锐步", n: "杠铃 Pro", p: 788, t: "奥杆", i: "" }, { b: "麦瑞克", n: "卧推凳 Pro", p: 688, t: "可调", i: "" }, { b: "汉臣", n: "史密斯机 Pro", p: 5280, t: "商用", i: "" },
            { b: "泰诺健", n: "力量架 Pro", p: 6080, t: "深蹲架", i: "" }, { b: "必确", n: "龙门架 Pro", p: 9800, t: "专业", i: "" }, { b: "星驰", n: "健腹轮 Pro", p: 88, t: "自动回弹", i: "" }, { b: "凯速", n: "俯卧撑架 Pro", p: 78, t: "防滑", i: "" }, { b: "悦步", n: "踏步机 Pro", p: 488, t: "静音", i: "" },
            { b: "亿健", n: "按摩筋膜枪 Pro", p: 588, t: "深层", i: "" }, { b: "云麦", n: "体脂秤 Pro", p: 198, t: "智能", i: "" }, { b: "小米", n: "运动手环 Pro", p: 249, t: "心率", i: "" }, { b: "佳明", n: "GPS手表 Pro", p: 2180, t: "跑步", i: "" }, { b: "颂拓", n: "户外手表 Pro", p: 2980, t: "登山", i: "" },
            { b: "宜准", n: "计步器 Pro", p: 108, t: "3D", i: "" }, { b: "迈欧", n: "心率带 Pro", p: 338, t: "蓝牙", i: "" }, { b: "速比涛", n: "泳镜 Pro", p: 228, t: "防雾", i: "" }, { b: "阿瑞娜", n: "泳帽 Pro", p: 78, t: "硅胶", i: "" }, { b: "洲克", n: "游泳圈 Pro", p: 88, t: "成人", i: "" },
            { b: "拓胜", n: "浮板 Pro", p: 68, t: "训练", i: "" }, { b: "Nike", n: "Free Pro", p: 699, t: "Training", i: "" }, { b: "Adidas", n: "Ultraboost Pro", p: 1499, t: "23", i: "" }, { b: "Reebok", n: "Nano X5", p: 899, t: "Crossfit", i: "" }, { b: "UnderArmour", n: "HOVR Pro", p: 999, t: "Running", i: "" },
            { b: "Lululemon", n: "Fast & Free Pro", p: 980, t: "Leggings", i: "" }, { b: "Puma", n: "Speedcat Pro", p: 599, t: "Racing", i: "" }, { b: "Decathlon", n: "Kalenji Pro", p: 249, t: "Running", i: "" }, { b: "Keep", n: "Yoga Mat Pro", p: 118, t: "Premium", i: "" }, { b: "李宁", n: "韦德 Pro", p: 799, t: "Basketball", i: "" },
            { b: "安踏", n: "KT Pro", p: 699, t: "Basketball", i: "" }, { b: "361°", n: "Spire Pro", p: 599, t: "Running", i: "" }, { b: "红双喜", n: "DHS Pro", p: 228, t: "Professional", i: "" }, { b: "Wilson", n: "Blade Pro", p: 788, t: "Tennis", i: "" }, { b: "Yonex", n: "Astrox Pro", p: 988, t: "Badminton", i: "" },
            { b: "Spalding", n: "TF-1000 Pro", p: 488, t: "Basketball", i: "" }, { b: "Molten", n: "V5M5000 Pro", p: 228, t: "Volleyball", i: "" }, { b: "迪卡侬", n: "Quechua Pro", p: 338, t: "Hiking", i: "" },
            { b: "Nike", n: "Adjustable", p: 399, t: "Dumbbells", i: "" }, { b: "Adidas", n: "Yoga Mat", p: 188, t: "Premium", i: "" }, { b: "Reebok", n: "Treadmill", p: 4200, t: "Pro", i: "" }, { b: "UnderArmour", n: "Training", p: 128, t: "Gloves", i: "" }, { b: "Lululemon", n: "Athletic", p: 880, t: "Pants", i: "" },
            { b: "Puma", n: "Jump Rope", p: 68, t: "Speed", i: "" }, { b: "Decathlon", n: "Arm Curl", p: 98, t: "Bar", i: "" }, { b: "Keep", n: "Resistance", p: 88, t: "Bands", i: "" }, { b: "Nike", n: "Kettlebell", p: 299, t: "20kg", i: "" }, { b: "Adidas", n: "Foam Roller", p: 188, t: "Massage", i: "" },
            { b: "Reebok", n: "Bench", p: 899, t: "Adjustable", i: "" }, { b: "UnderArmour", n: "Compression", p: 299, t: "Shorts", i: "" }, { b: "Lululemon", n: "Sports", p: 680, t: "Bra", i: "" }, { b: "Puma", n: "Agility", p: 88, t: "Ladder", i: "" }, { b: "Decathlon", n: "Pull-Up", p: 299, t: "Bar", i: "" },
            { b: "Keep", n: "Yoga Block", p: 58, t: "EVA", i: "" }, { b: "Nike", n: "Medicine Ball", p: 399, t: "10kg", i: "" }, { b: "Adidas", n: "Battle Rope", p: 299, t: "15m", i: "" }, { b: "Reebok", n: "Rowing", p: 5800, t: "Machine", i: "" }, { b: "UnderArmour", n: "Baseball", p: 199, t: "Cap", i: "" },
            { b: "Lululemon", n: "Running", p: 880, t: "Shorts", i: "" }, { b: "Puma", n: "Punching", p: 399, t: "Bag", i: "" }, { b: "Decathlon", n: "Ab Wheel", p: 88, t: "Roller", i: "" }, { b: "Keep", n: "Push-Up", p: 68, t: "Bars", i: "" }, { b: "Nike", n: "Weight", p: 599, t: "Vest", i: "" },
            { b: "Adidas", n: "Balance", p: 299, t: "Board", i: "" }, { b: "Reebok", n: "Elliptical", p: 6800, t: "Trainer", i: "" }, { b: "UnderArmour", n: "Sweatband", p: 58, t: "Headband", i: "" }, { b: "Lululemon", n: "Tank Top", p: 580, t: "Athletic", i: "" }, { b: "Puma", n: "Speed", p: 199, t: "Ladder", i: "" },
            { b: "Decathlon", n: "Dip", p: 199, t: "Bars", i: "" }, { b: "Keep", n: "Stability", p: 188, t: "Ball", i: "" }, { b: "Nike", n: "Sandbag", p: 299, t: "Training", i: "" }, { b: "Adidas", n: "Parachute", p: 399, t: "Resistance", i: "" }, { b: "Reebok", n: "Spin", p: 3800, t: "Bike", i: "" },
            { b: "UnderArmour", n: "Sleeveless", p: 299, t: "Tee", i: "" }, { b: "Lululemon", n: "Hoodie", p: 1080, t: "Athletic", i: "" }, { b: "Puma", n: "Agility", p: 199, t: "Cone", i: "" }, { b: "Decathlon", n: "TRX", p: 399, t: "Suspension", i: "" }, { b: "Keep", n: "Massage", p: 188, t: "Gun", i: "" },
            { b: "Nike", n: "Plyometric", p: 299, t: "Box", i: "" }, { b: "Adidas", n: "Sliding", p: 199, t: "Discs", i: "" }, { b: "Reebok", n: "Functional", p: 899, t: "Trainer", i: "" }, { b: "UnderArmour", n: "Compression", p: 399, t: "Socks", i: "" }, { b: "Lululemon", n: "Scuba", p: 1280, t: "Hoodie", i: "" },
            { b: "Puma", n: "Speed", p: 299, t: "Hurdles", i: "" }, { b: "Decathlon", n: "Gymnastic", p: 199, t: "Rings", i: "" }, { b: "Keep", n: "Yoga", p: 88, t: "Strap", i: "" }, { b: "Nike", n: "Weighted", p: 399, t: "Vest", i: "" }, { b: "Adidas", n: "Balance", p: 299, t: "Cushion", i: "" }
        ],
        'toy': [
            { b: "乐高", n: "积木城堡", p: 688, t: "1000片", i: "" }, { b: "万代", n: "高达模型", p: 388, t: "RG", i: "" }, { b: "孩之宝", n: "变形金刚", p: 288, t: "擎天柱", i: "" }, { b: "美泰", n: "芭比娃娃", p: 158, t: "梦幻", i: "" },
            { b: "迪士尼", n: "公主玩偶", p: 128, t: "艾莎", i: "" }, { b: "泡泡玛特", n: "盲盒", p: 69, t: "Molly", i: "" }, { b: "52TOYS", n: "变形玩具", p: 199, t: "兽盒", i: "" }, { b: "奥迪双钻", n: "四驱车", p: 88, t: "竞速", i: "" },
            { b: "多美", n: "小汽车", p: 45, t: "合金", i: "" }, { b: "风火轮", n: "赛车套装", p: 158, t: "轨道", i: "" }, { b: "星辉", n: "遥控车", p: 288, t: "1:14", i: "" }, { b: "环奇", n: "遥控飞机", p: 388, t: "直升机", i: "" },
            { b: "大疆", n: "教育无人机", p: 2999, t: "编程", i: "" }, { b: "优必选", n: "机器人", p: 1688, t: "智能", i: "" }, { b: "小米", n: "积木机器人", p: 499, t: "编程", i: "" }, { b: "科大讯飞", n: "学习机", p: 1288, t: "AI", i: "" },
            { b: "火火兔", n: "故事机", p: 168, t: "早教", i: "" }, { b: "贝恩施", n: "益智玩具", p: 88, t: "拼图", i: "" }, { b: "铭塔", n: "磁力片", p: 128, t: "100片", i: "" }, { b: "弥鹿", n: "拼图", p: 68, t: "1000片", i: "" },
            { b: "TOI", n: "儿童拼图", p: 58, t: "进阶", i: "" }, { b: "Hape", n: "木质玩具", p: 188, t: "厨房", i: "" }, { b: "费雪", n: "摇铃", p: 68, t: "婴儿", i: "" }, { b: "澳贝", n: "爬行垫", p: 288, t: "加厚", i: "" },
            { b: "伟易达", n: "学步车", p: 388, t: "多功能", i: "" }, { b: "小泰克", n: "滑梯", p: 688, t: "室内", i: "" }, { b: "好孩子", n: "摇摇马", p: 258, t: "木马", i: "" }, { b: "智高", n: "彩泥", p: 48, t: "24色", i: "" },
            { b: "晨光", n: "水彩笔", p: 28, t: "36色", i: "" }, { b: "得力", n: "蜡笔", p: 18, t: "48色", i: "" }, { b: "马培德", n: "彩铅", p: 88, t: "72色", i: "" }, { b: "辉柏嘉", n: "水溶彩铅", p: 168, t: "专业", i: "" },
            { b: "任天堂", n: "Switch游戏", p: 399, t: "马里奥", i: "" }, { b: "索尼", n: "PS5游戏", p: 468, t: "战神", i: "" }, { b: "微软", n: "Xbox游戏", p: 388, t: "光环", i: "" }, { b: "Steam", n: "游戏卡", p: 100, t: "充值", i: "" },
            { b: "罗技", n: "游戏手柄", p: 388, t: "无线", i: "" }, { b: "北通", n: "手柄", p: 188, t: "精英", i: "" }, { b: "八位堂", n: "复古手柄", p: 268, t: "蓝牙", i: "" }, { b: "雷蛇", n: "游戏鼠标", p: 488, t: "电竞", i: "" },
            { b: "乐高", n: "星球大战", p: 888, t: "UCS", i: "" }, { b: "万代", n: "MG高达", p: 588, t: "1/100", i: "" }, { b: "孩之宝", n: "变形金刚", p: 388, t: "MP", i: "" }, { b: "美泰", n: "芭比", p: 228, t: "Dreamhouse", i: "" },
            { b: "迪士尼", n: "冰雪奇缘", p: 188, t: "Elsa", i: "" }, { b: "泡泡玛特", n: "SKULLPANDA", p: 79, t: "盲盒", i: "" }, { b: "52TOYS", n: "猛兽匣", p: 299, t: "变形", i: "" }, { b: "奥迪双钻", n: "四驱车", p: 128, t: "Super", i: "" },
            { b: "多美", n: "Tomica", p: 68, t: "Limited", i: "" }, { b: "风火轮", n: "Hot Wheels", p: 198, t: "Track", i: "" }, { b: "星辉", n: "遥控车", p: 388, t: "1:10", i: "" }, { b: "环奇", n: "无人机", p: 588, t: "FPV", i: "" },
            { b: "大疆", n: "RoboMaster", p: 3999, t: "S1", i: "" }, { b: "优必选", n: "Alpha", p: 2288, t: "Pro", i: "" }, { b: "小米", n: "米兔", p: 699, t: "积木", i: "" }, { b: "科大讯飞", n: "T10", p: 1888, t: "AI", i: "" },
            { b: "火火兔", n: "G6", p: 228, t: "早教", i: "" }, { b: "贝恩施", n: "磁力棒", p: 128, t: "益智", i: "" },
            { b: "乐高", n: "积木城堡 Pro", p: 788, t: "2000片", i: "" }, { b: "万代", n: "高达模型 Pro", p: 488, t: "PG", i: "" }, { b: "孩之宝", n: "变形金刚 Pro", p: 388, t: "擎天柱", i: "" }, { b: "美泰", n: "芭比娃娃 Pro", p: 198, t: "梦幻", i: "" }, { b: "迪士尼", n: "公主玩偶 Pro", p: 158, t: "艾莎", i: "" },
            { b: "泡泡玛特", n: "盲盒 Pro", p: 89, t: "Molly", i: "" }, { b: "52TOYS", n: "变形玩具 Pro", p: 249, t: "兽盒", i: "" }, { b: "奥迪双钻", n: "四驱车 Pro", p: 118, t: "竞速", i: "" }, { b: "多美", n: "小汽车 Pro", p: 65, t: "合金", i: "" }, { b: "风火轮", n: "赛车套装 Pro", p: 198, t: "轨道", i: "" },
            { b: "星辉", n: "遥控车 Pro", p: 388, t: "1:10", i: "" }, { b: "环奇", n: "遥控飞机 Pro", p: 488, t: "直升机", i: "" }, { b: "大疆", n: "教育无人机 Pro", p: 3499, t: "编程", i: "" }, { b: "优必选", n: "机器人 Pro", p: 1988, t: "智能", i: "" }, { b: "小米", n: "积木机器人 Pro", p: 599, t: "编程", i: "" },
            { b: "科大讯飞", n: "学习机 Pro", p: 1588, t: "AI", i: "" }, { b: "火火兔", n: "故事机 Pro", p: 198, t: "早教", i: "" }, { b: "贝恩施", n: "益智玩具 Pro", p: 118, t: "拼图", i: "" }, { b: "铭塔", n: "磁力片 Pro", p: 158, t: "200片", i: "" }, { b: "弥鹿", n: "拼图 Pro", p: 88, t: "2000片", i: "" },
            { b: "TOI", n: "儿童拼图 Pro", p: 78, t: "进阶", i: "" }, { b: "Hape", n: "木质玩具 Pro", p: 228, t: "厨房", i: "" }, { b: "费雪", n: "摇铃 Pro", p: 88, t: "婴儿", i: "" }, { b: "澳贝", n: "爬行垫 Pro", p: 338, t: "加厚", i: "" }, { b: "伟易达", n: "学步车 Pro", p: 488, t: "多功能", i: "" },
            { b: "小泰克", n: "滑梯 Pro", p: 788, t: "室内", i: "" }, { b: "好孩子", n: "摇摇马 Pro", p: 298, t: "木马", i: "" }, { b: "智高", n: "彩泥 Pro", p: 68, t: "36色", i: "" }, { b: "晨光", n: "水彩笔 Pro", p: 38, t: "48色", i: "" }, { b: "得力", n: "蜡笔 Pro", p: 28, t: "60色", i: "" },
            { b: "马培德", n: "彩铅 Pro", p: 108, t: "96色", i: "" }, { b: "辉柏嘉", n: "水溶彩铅 Pro", p: 198, t: "专业", i: "" }, { b: "任天堂", n: "Switch游戏 Pro", p: 499, t: "马里奥", i: "" }, { b: "索尼", n: "PS5游戏 Pro", p: 568, t: "战神", i: "" }, { b: "微软", n: "Xbox游戏 Pro", p: 488, t: "光环", i: "" },
            { b: "Steam", n: "游戏卡 Pro", p: 150, t: "充值", i: "" }, { b: "罗技", n: "游戏手柄 Pro", p: 488, t: "无线", i: "" }, { b: "北通", n: "手柄 Pro", p: 228, t: "精英", i: "" }, { b: "八位堂", n: "复古手柄 Pro", p: 308, t: "蓝牙", i: "" }, { b: "雷蛇", n: "游戏鼠标 Pro", p: 588, t: "电竞", i: "" },
            { b: "乐高", n: "星球大战 Pro", p: 988, t: "UCS", i: "" }, { b: "万代", n: "MG高达 Pro", p: 688, t: "1/100", i: "" }, { b: "孩之宝", n: "变形金刚 Pro", p: 488, t: "MP", i: "" }, { b: "美泰", n: "芭比 Pro", p: 268, t: "Dreamhouse", i: "" }, { b: "迪士尼", n: "冰雪奇缘 Pro", p: 218, t: "Elsa", i: "" },
            { b: "泡泡玛特", n: "SKULLPANDA Pro", p: 99, t: "盲盒", i: "" }, { b: "52TOYS", n: "猛兽匣 Pro", p: 349, t: "变形", i: "" }, { b: "奥迪双钻", n: "四驱车 Pro", p: 158, t: "Super", i: "" }, { b: "多美", n: "Tomica Pro", p: 88, t: "Limited", i: "" }, { b: "风火轮", n: "Hot Wheels Pro", p: 238, t: "Track", i: "" },
            { b: "星辉", n: "遥控车 Pro", p: 488, t: "1:8", i: "" }, { b: "环奇", n: "无人机 Pro", p: 688, t: "FPV", i: "" }, { b: "大疆", n: "RoboMaster Pro", p: 4499, t: "S1", i: "" }, { b: "优必选", n: "Alpha Pro", p: 2688, t: "Pro", i: "" }, { b: "小米", n: "米兔 Pro", p: 799, t: "积木", i: "" },
            { b: "科大讯飞", n: "T10 Pro", p: 2188, t: "AI", i: "" }, { b: "火火兔", n: "G7", p: 268, t: "早教", i: "" }, { b: "贝恩施", n: "磁力棒 Pro", p: 158, t: "益智", i: "" },
            { b: "乐高", n: "城市系列", p: 888, t: "2000片", i: "" }, { b: "万代", n: "高达模型", p: 588, t: "MG", i: "" }, { b: "孩之宝", n: "变形金刚", p: 488, t: "大黄蜂", i: "" }, { b: "美泰", n: "芭比娃娃", p: 288, t: "梦幻屋", i: "" }, { b: "迪士尼", n: "公主玩偶", p: 228, t: "灰姑娘", i: "" },
            { b: "泡泡玛特", n: "盲盒", p: 99, t: "Skullpanda", i: "" }, { b: "52TOYS", n: "变形玩具", p: 299, t: "猛兽匣", i: "" }, { b: "奥迪双钻", n: "四驱车", p: 128, t: "竞速王", i: "" }, { b: "乐高", n: "星球大战", p: 1288, t: "3000片", i: "" }, { b: "万代", n: "高达模型", p: 888, t: "PG", i: "" },
            { b: "孩之宝", n: "变形金刚", p: 688, t: "擎天柱", i: "" }, { b: "美泰", n: "芭比娃娃", p: 388, t: "时尚", i: "" }, { b: "迪士尼", n: "公主玩偶", p: 328, t: "白雪公主", i: "" }, { b: "泡泡玛特", n: "盲盒", p: 129, t: "Molly", i: "" }, { b: "52TOYS", n: "变形玩具", p: 399, t: "超活化", i: "" },
            { b: "奥迪双钻", n: "四驱车", p: 168, t: "超级", i: "" }, { b: "乐高", n: "科技系列", p: 1888, t: "4000片", i: "" }, { b: "万代", n: "高达模型", p: 1288, t: "RG", i: "" }, { b: "孩之宝", n: "变形金刚", p: 888, t: "威震天", i: "" }, { b: "美泰", n: "芭比娃娃", p: 488, t: "豪华", i: "" },
            { b: "迪士尼", n: "公主玩偶", p: 428, t: "小美人鱼", i: "" }, { b: "泡泡玛特", n: "盲盒", p: 159, t: "Dimoo", i: "" }, { b: "52TOYS", n: "变形玩具", p: 499, t: "超活化", i: "" }, { b: "奥迪双钻", n: "四驱车", p: 208, t: "极速", i: "" }, { b: "乐高", n: "创意系列", p: 988, t: "1500片", i: "" },
            { b: "万代", n: "高达模型", p: 688, t: "HG", i: "" }, { b: "孩之宝", n: "变形金刚", p: 588, t: "红蜘蛛", i: "" }, { b: "美泰", n: "芭比娃娃", p: 588, t: "梦想", i: "" }, { b: "迪士尼", n: "公主玩偶", p: 528, t: "贝儿", i: "" }, { b: "泡泡玛特", n: "盲盒", p: 189, t: "Labubu", i: "" },
            { b: "52TOYS", n: "变形玩具", p: 599, t: "超活化", i: "" }, { b: "奥迪双钻", n: "四驱车", p: 248, t: "闪电", i: "" }, { b: "乐高", n: "建筑系列", p: 2888, t: "5000片", i: "" }, { b: "万代", n: "高达模型", p: 1588, t: "MGEX", i: "" }, { b: "孩之宝", n: "变形金刚", p: 1088, t: "声波", i: "" },
            { b: "美泰", n: "芭比娃娃", p: 688, t: "收藏", i: "" }, { b: "迪士尼", n: "公主玩偶", p: 628, t: "花木兰", i: "" }, { b: "泡泡玛特", n: "盲盒", p: 219, t: "Pucky", i: "" }, { b: "52TOYS", n: "变形玩具", p: 699, t: "超活化", i: "" }, { b: "奥迪双钻", n: "四驱车", p: 288, t: "风暴", i: "" },
            { b: "乐高", n: "超级英雄", p: 1588, t: "2500片", i: "" }, { b: "万代", n: "高达模型", p: 1188, t: "HGUC", i: "" }, { b: "孩之宝", n: "变形金刚", p: 1288, t: "补天士", i: "" }, { b: "美泰", n: "芭比娃娃", p: 788, t: "限量", i: "" }, { b: "迪士尼", n: "公主玩偶", p: 728, t: "长发公主", i: "" },
            { b: "泡泡玛特", n: "盲盒", p: 249, t: "The Monsters", i: "" }, { b: "52TOYS", n: "变形玩具", p: 799, t: "超活化", i: "" }, { b: "奥迪双钻", n: "四驱车", p: 328, t: "雷霆", i: "" }, { b: "乐高", n: "忍者系列", p: 1288, t: "2000片", i: "" }, { b: "万代", n: "高达模型", p: 988, t: "SD", i: "" },
            { b: "孩之宝", n: "变形金刚", p: 888, t: "钢锁", i: "" }, { b: "美泰", n: "芭比娃娃", p: 888, t: "特别", i: "" }, { b: "迪士尼", n: "公主玩偶", p: 828, t: "梅莉达", i: "" }, { b: "泡泡玛特", n: "盲盒", p: 279, t: "Hirono", i: "" }, { b: "52TOYS", n: "变形玩具", p: 899, t: "超活化", i: "" }
        ],
        'car': [
            { b: "米其林", n: "轮胎", p: 688, t: "205/55R16", i: "" }, { b: "固特异", n: "轮胎", p: 588, t: "静音", i: "" }, { b: "马牌", n: "轮胎", p: 758, t: "防爆", i: "" }, { b: "普利司通", n: "轮胎", p: 628, t: "耐磨", i: "" },
            { b: "博世", n: "雨刷", p: 88, t: "无骨", i: "" }, { b: "3M", n: "车膜", p: 1288, t: "全车", i: "" }, { b: "龟牌", n: "洗车液", p: 48, t: "2L", i: "" }, { b: "美光", n: "镀膜剂", p: 128, t: "水晶", i: "" },
            { b: "嘉实多", n: "机油", p: 268, t: "5W-30", i: "" }, { b: "美孚", n: "机油", p: 358, t: "全合成", i: "" }, { b: "壳牌", n: "机油", p: 288, t: "HX8", i: "" }, { b: "道达尔", n: "机油", p: 298, t: "快驰", i: "" },
            { b: "曼牌", n: "机滤", p: 58, t: "原厂", i: "" }, { b: "马勒", n: "空滤", p: 68, t: "高效", i: "" }, { b: "电装", n: "火花塞", p: 88, t: "铱金", i: "" }, { b: "NGK", n: "火花塞", p: 78, t: "铂金", i: "" },
            { b: "风帆", n: "蓄电池", p: 388, t: "60AH", i: "" }, { b: "瓦尔塔", n: "电瓶", p: 588, t: "免维护", i: "" }, { b: "骆驼", n: "蓄电池", p: 428, t: "AGM", i: "" }, { b: "汤浅", n: "电瓶", p: 688, t: "启停", i: "" },
            { b: "飞利浦", n: "车灯", p: 158, t: "LED", i: "" }, { b: "欧司朗", n: "大灯", p: 188, t: "氙气", i: "" }, { b: "雪莱特", n: "灯泡", p: 68, t: "卤素", i: "" }, { b: "海拉", n: "雾灯", p: 288, t: "透镜", i: "" },
            { b: "70迈", n: "行车记录仪", p: 299, t: "4K", i: "" }, { b: "盯盯拍", n: "记录仪", p: 388, t: "前后双录", i: "" }, { b: "凌度", n: "行车记录仪", p: 268, t: "夜视", i: "" }, { b: "360", n: "记录仪", p: 299, t: "智能", i: "" },
            { b: "征服者", n: "电子狗", p: 688, t: "云测速", i: "" }, { b: "善领", n: "导航仪", p: 888, t: "GPS", i: "" }, { b: "任我游", n: "导航", p: 588, t: "车载", i: "" }, { b: "凯立德", n: "地图卡", p: 188, t: "升级", i: "" },
            { b: "先锋", n: "车载音响", p: 1288, t: "蓝牙", i: "" }, { b: "阿尔派", n: "主机", p: 1688, t: "CarPlay", i: "" }, { b: "JBL", n: "车载音响", p: 888, t: "低音炮", i: "" }, { b: "哈曼卡顿", n: "喇叭", p: 1888, t: "套装", i: "" },
            { b: "倍思", n: "车载支架", p: 58, t: "磁吸", i: "" }, { b: "绿联", n: "车充", p: 48, t: "快充", i: "" }, { b: "品胜", n: "车载充电器", p: 68, t: "双口", i: "" }, { b: "公牛", n: "车载逆变器", p: 188, t: "300W", i: "" },
            { b: "米其林", n: "Primacy", p: 888, t: "静音", i: "" }, { b: "固特异", n: "Assurance", p: 688, t: "TripleMax", i: "" }, { b: "马牌", n: "CC6", p: 988, t: "舒适", i: "" }, { b: "普利司通", n: "Turanza", p: 758, t: "T001", i: "" },
            { b: "博世", n: "Aerotwin", p: 128, t: "雨刷", i: "" }, { b: "3M", n: "Crystalline", p: 1888, t: "车膜", i: "" }, { b: "龟牌", n: "冰蜡", p: 68, t: "洗车", i: "" }, { b: "美光", n: "G18216", p: 168, t: "镀膜", i: "" },
            { b: "嘉实多", n: "极护", p: 388, t: "0W-40", i: "" }, { b: "美孚", n: "1号", p: 488, t: "0W-20", i: "" }, { b: "壳牌", n: "超凡", p: 358, t: "5W-40", i: "" }, { b: "道达尔", n: "快驰", p: 328, t: "9000", i: "" },
            { b: "曼牌", n: "HU", p: 78, t: "机滤", i: "" }, { b: "马勒", n: "OC", p: 88, t: "机滤", i: "" }, { b: "电装", n: "IK", p: 108, t: "火花塞", i: "" }, { b: "NGK", n: "BKR", p: 98, t: "火花塞", i: "" },
            { b: "风帆", n: "6-QW", p: 488, t: "80AH", i: "" }, { b: "瓦尔塔", n: "蓝标", p: 688, t: "75AH", i: "" }
        ,
            { b: "米其林", n: "轮胎", p: 788, t: "215/55R17", i: "" }, { b: "固特异", n: "轮胎", p: 688, t: "防滑", i: "" }, { b: "马牌", n: "轮胎", p: 858, t: "静音", i: "" }, { b: "普利司通", n: "轮胎", p: 728, t: "耐用", i: "" },
            { b: "博世", n: "雨刷", p: 108, t: "无骨", i: "" }, { b: "3M", n: "车膜", p: 1388, t: "全车", i: "" }, { b: "龟牌", n: "洗车液", p: 58, t: "3L", i: "" }, { b: "美光", n: "镀膜剂", p: 148, t: "纳米", i: "" },
            { b: "嘉实多", n: "机油", p: 298, t: "5W-40", i: "" }, { b: "美孚", n: "机油", p: 388, t: "全合成", i: "" }, { b: "壳牌", n: "机油", p: 318, t: "HX9", i: "" }, { b: "道达尔", n: "机油", p: 328, t: "快驰", i: "" }
        ],
        'mus': [
            { b: "雅马哈", n: "电钢琴", p: 3888, t: "88键", i: "" }, { b: "卡西欧", n: "电子琴", p: 1288, t: "61键", i: "" }, { b: "罗兰", n: "合成器", p: 5888, t: "专业", i: "" }, { b: "科音", n: "电钢琴", p: 2688, t: "重锤", i: "" },
            { b: "芬达", n: "电吉他", p: 2888, t: "Stratocaster", i: "" }, { b: "吉普森", n: "电吉他", p: 8888, t: "Les Paul", i: "" }, { b: "依班娜", n: "电吉他", p: 1888, t: "RG", i: "" }, { b: "ESP", n: "电吉他", p: 3888, t: "LTD", i: "" },
            { b: "马丁", n: "民谣吉他", p: 5888, t: "D28", i: "" }, { b: "泰勒", n: "民谣吉他", p: 8888, t: "414", i: "" }, { b: "雅马哈", n: "民谣吉他", p: 888, t: "FG800", i: "" }, { b: "楚门", n: "吉他", p: 1288, t: "全单", i: "" },
            { b: "芬达", n: "电贝司", p: 3288, t: "Jazz Bass", i: "" }, { b: "Music Man", n: "贝司", p: 12888, t: "StingRay", i: "" }, { b: "Cort", n: "贝司", p: 1688, t: "4弦", i: "" }, { b: "Ibanez", n: "贝司", p: 2388, t: "5弦", i: "" },
            { b: "Pearl", n: "架子鼓", p: 5888, t: "5鼓", i: "" }, { b: "Tama", n: "爵士鼓", p: 8888, t: "专业", i: "" }, { b: "罗兰", n: "电子鼓", p: 6888, t: "静音", i: "" }, { b: "美派", n: "架子鼓", p: 3888, t: "入门", i: "" },
            { b: "雅马哈", n: "萨克斯", p: 3888, t: "中音", i: "" }, { b: "塞尔玛", n: "萨克斯", p: 28888, t: "法国", i: "" }, { b: "杰普特", n: "萨克斯", p: 1888, t: "降E", i: "" }, { b: "柳泽", n: "萨克斯", p: 8888, t: "次中音", i: "" },
            { b: "雅马哈", n: "小号", p: 2888, t: "降B", i: "" }, { b: "巴哈", n: "小号", p: 5888, t: "专业", i: "" }, { b: "津宝", n: "小号", p: 888, t: "学生", i: "" }, { b: "星海", n: "小号", p: 1288, t: "镀银", i: "" },
            { b: "雅马哈", n: "长笛", p: 1888, t: "16孔", i: "" }, { b: "村松", n: "长笛", p: 8888, t: "手工", i: "" }, { b: "珍珠", n: "长笛", p: 3888, t: "专业", i: "" }, { b: "阿塔斯", n: "长笛", p: 12888, t: "纯银", i: "" },
            { b: "敦煌", n: "古筝", p: 2888, t: "694", i: "" }, { b: "朱雀", n: "古筝", p: 5888, t: "520", i: "" }, { b: "龙凤", n: "古筝", p: 1688, t: "入门", i: "" }, { b: "宏声", n: "古筝", p: 3888, t: "专业", i: "" },
            { b: "虎丘", n: "琵琶", p: 1888, t: "红木", i: "" }, { b: "星海", n: "琵琶", p: 3888, t: "紫檀", i: "" }, { b: "敦煌", n: "二胡", p: 1288, t: "红木", i: "" }, { b: "苏州", n: "二胡", p: 2888, t: "老红木", i: "" },
            { b: "雅马哈", n: "P-125", p: 3888, t: "电钢琴", i: "" }, { b: "卡西欧", n: "PX-S3000", p: 2888, t: "电钢琴", i: "" }, { b: "罗兰", n: "FP-30X", p: 4888, t: "电钢琴", i: "" }, { b: "科音", n: "SP280", p: 3288, t: "电钢琴", i: "" },
            { b: "芬达", n: "Player", p: 3888, t: "Strat", i: "" }, { b: "吉普森", n: "SG", p: 9888, t: "Standard", i: "" }, { b: "依班娜", n: "RG550", p: 2888, t: "Genesis", i: "" }, { b: "ESP", n: "Eclipse", p: 4888, t: "LTD", i: "" },
            { b: "马丁", n: "D-18", p: 6888, t: "Standard", i: "" }, { b: "泰勒", n: "314ce", p: 9888, t: "V-Class", i: "" }, { b: "雅马哈", n: "FG830", p: 1288, t: "民谣", i: "" }, { b: "楚门", n: "D25", p: 1888, t: "全单", i: "" },
            { b: "芬达", n: "Precision", p: 3888, t: "Bass", i: "" }, { b: "Music Man", n: "StingRay", p: 15888, t: "5弦", i: "" }, { b: "Cort", n: "Action", p: 2288, t: "4弦", i: "" }, { b: "Ibanez", n: "SR", p: 3288, t: "5弦", i: "" },
            { b: "Pearl", n: "Export", p: 6888, t: "5鼓", i: "" }, { b: "Tama", n: "Starclassic", p: 10888, t: "Maple", i: "" }, { b: "罗兰", n: "TD-27KV", p: 8888, t: "电子鼓", i: "" }
        ,
            { b: "雅马哈", n: "电钢琴", p: 4388, t: "P125", i: "" }, { b: "卡西欧", n: "电子琴", p: 1488, t: "CT-X", i: "" }, { b: "罗兰", n: "合成器", p: 6388, t: "Jupiter", i: "" }, { b: "科音", n: "电钢琴", p: 2888, t: "B2", i: "" },
            { b: "芬达", n: "电吉他", p: 3288, t: "Telecaster", i: "" }, { b: "吉普森", n: "电吉他", p: 9888, t: "SG", i: "" }, { b: "依班娜", n: "电吉他", p: 2088, t: "Jem", i: "" }, { b: "ESP", n: "电吉他", p: 4288, t: "Eclipse", i: "" },
            { b: "马丁", n: "民谣吉他", p: 6388, t: "D18", i: "" }, { b: "泰勒", n: "民谣吉他", p: 9388, t: "314", i: "" }, { b: "雅马哈", n: "民谣吉他", p: 988, t: "LL16", i: "" }, { b: "楚门", n: "吉他", p: 1488, t: "全单", i: "" }
        ],
        'jew': [
            { b: "周大福", n: "黄金项链", p: 3888, t: "足金", i: "" }, { b: "周生生", n: "钻石戒指", p: 8888, t: "18K金", i: "" }, { b: "老凤祥", n: "金手镯", p: 12888, t: "999金", i: "" }, { b: "六福珠宝", n: "翡翠吊坠", p: 5888, t: "A货", i: "" },
            { b: "谢瑞麟", n: "珍珠项链", p: 2888, t: "淡水珍珠", i: "" }, { b: "潘多拉", n: "串珠手链", p: 1288, t: "银饰", i: "" }, { b: "施华洛世奇", n: "水晶项链", p: 888, t: "奥地利水晶", i: "" }, { b: "APM", n: "银饰耳环", p: 588, t: "925银", i: "" },
            { b: "Tiffany", n: "钥匙项链", p: 6888, t: "经典款", i: "" }, { b: "Cartier", n: "Love手镯", p: 38888, t: "18K玫瑰金", i: "" }, { b: "Bvlgari", n: "蛇形手镯", p: 28888, t: "宝格丽", i: "" }, { b: "VanCleef", n: "四叶草项链", p: 18888, t: "梵克雅宝", i: "" },
            { b: "周大生", n: "钻石耳钉", p: 2888, t: "30分", i: "" }, { b: "老庙黄金", n: "金戒指", p: 1888, t: "足金", i: "" }, { b: "中国黄金", n: "金条", p: 28888, t: "100g", i: "" }, { b: "菜百首饰", n: "金币", p: 3888, t: "纪念币", i: "" },
            { b: "周六福", n: "银手镯", p: 388, t: "999银", i: "" }, { b: "明牌珠宝", n: "玉镯", p: 8888, t: "和田玉", i: "" }, { b: "金大福", n: "金吊坠", p: 1588, t: "生肖", i: "" }, { b: "赛菲尔", n: "钻戒", p: 12888, t: "50分", i: "" },
            { b: "I Do", n: "婚戒", p: 15888, t: "对戒", i: "" }, { b: "DR", n: "求婚钻戒", p: 28888, t: "1克拉", i: "" }, { b: "Darry Ring", n: "钻石项链", p: 18888, t: "真爱", i: "" }, { b: "Chow Tai Fook", n: "传承系列", p: 38888, t: "黄金套装", i: "" },
            { b: "Links", n: "友谊手链", p: 2888, t: "银饰", i: "" }, { b: "Enzo", n: "情侣对戒", p: 5888, t: "铂金", i: "" }, { b: "Chaumet", n: "蜜蜂系列", p: 48888, t: "高级珠宝", i: "" }, { b: "Chopard", n: "Happy Diamonds", p: 88888, t: "萧邦", i: "" },
            { b: "Piaget", n: "玫瑰系列", p: 68888, t: "伯爵", i: "" }, { b: "Graff", n: "钻石耳环", p: 188888, t: "格拉夫", i: "" }, { b: "Harry Winston", n: "钻石项链", p: 288888, t: "海瑞温斯顿", i: "" }, { b: "Mikimoto", n: "珍珠耳环", p: 12888, t: "御木本", i: "" },
            { b: "Tasaki", n: "珍珠项链", p: 18888, t: "日本", i: "" }, { b: "Damiani", n: "钻石戒指", p: 28888, t: "意大利", i: "" }, { b: "Buccellati", n: "手镯", p: 38888, t: "布契拉提", i: "" }, { b: "Pomellato", n: "彩宝戒指", p: 15888, t: "宝曼兰朵", i: "" },
            { b: "De Beers", n: "钻石吊坠", p: 48888, t: "戴比尔斯", i: "" }, { b: "Boodles", n: "彩宝项链", p: 58888, t: "英国", i: "" }, { b: "Messika", n: "钻石手链", p: 38888, t: "法国", i: "" }, { b: "Qeelin", n: "葫芦吊坠", p: 8888, t: "麒麟珠宝", i: "" },
            { b: "周大福", n: "传承", p: 18888, t: "黄金", i: "" }, { b: "周生生", n: "Infini", p: 12888, t: "钻石", i: "" }, { b: "老凤祥", n: "龙凤", p: 15888, t: "黄金", i: "" }, { b: "六福珠宝", n: "足金", p: 6888, t: "999", i: "" },
            { b: "谢瑞麟", n: "18K", p: 3888, t: "金饰", i: "" }, { b: "潘多拉", n: "Moments", p: 1888, t: "手链", i: "" }, { b: "施华洛世奇", n: "Swan", p: 1288, t: "项链", i: "" }, { b: "APM", n: "Monaco", p: 888, t: "耳环", i: "" },
            { b: "Tiffany", n: "T", p: 8888, t: "手镯", i: "" }, { b: "Cartier", n: "Juste", p: 18888, t: "手镯", i: "" }, { b: "Bvlgari", n: "B.Zero1", p: 15888, t: "戒指", i: "" }, { b: "VanCleef", n: "Alhambra", p: 22888, t: "项链", i: "" },
            { b: "周大生", n: "Forevermark", p: 3888, t: "钻戒", i: "" }, { b: "老庙黄金", n: "足金", p: 2288, t: "手链", i: "" }, { b: "中国黄金", n: "投资金条", p: 38888, t: "50g", i: "" }, { b: "菜百首饰", n: "生肖", p: 4888, t: "金币", i: "" },
            { b: "周六福", n: "足银", p: 588, t: "999", i: "" }, { b: "明牌珠宝", n: "翡翠", p: 12888, t: "A货", i: "" }
        ,
            { b: "周大福", n: "黄金项链", p: 4288, t: "足金", i: "" }, { b: "周生生", n: "钻石戒指", p: 9388, t: "18K金", i: "" }, { b: "老凤祥", n: "金手镯", p: 13888, t: "999金", i: "" }, { b: "六福珠宝", n: "翡翠吊坠", p: 6388, t: "A货", i: "" },
            { b: "谢瑞麟", n: "珍珠项链", p: 3288, t: "淡水珍珠", i: "" }, { b: "潘多拉", n: "串珠手链", p: 1388, t: "银饰", i: "" }, { b: "施华洛世奇", n: "水晶项链", p: 988, t: "奥地利水晶", i: "" }, { b: "APM", n: "银饰耳环", p: 688, t: "925银", i: "" },
            { b: "周大福", n: "翡翠", p: 18888, t: "A货", i: "" }, { b: "周生生", n: "足金", p: 8888, t: "999", i: "" }, { b: "老凤祥", n: "玉镯", p: 15888, t: "和田玉", i: "" }, { b: "六福珠宝", n: "钻戒", p: 12888, t: "18K", i: "" }
        ],
        'art': [
            { b: "晨光", n: "素描铅笔", p: 28, t: "12支装", i: "" }, { b: "马利", n: "水彩颜料", p: 68, t: "24色", i: "" }, { b: "温莎牛顿", n: "油画颜料", p: 188, t: "12色", i: "" }, { b: "樱花", n: "马克笔", p: 158, t: "60色", i: "" },
            { b: "辉柏嘉", n: "彩铅", p: 128, t: "48色", i: "" }, { b: "施德楼", n: "自动铅笔", p: 48, t: "0.5mm", i: "" }, { b: "三菱", n: "针管笔", p: 88, t: "8支装", i: "" }, { b: "百乐", n: "钢笔", p: 128, t: "78G", i: "" },
            { b: "凌美", n: "钢笔", p: 288, t: "Safari", i: "" }, { b: "派克", n: "钢笔", p: 688, t: "卓尔", i: "" }, { b: "万宝龙", n: "钢笔", p: 3888, t: "大班", i: "" }, { b: "英雄", n: "钢笔", p: 88, t: "616", i: "" },
            { b: "得力", n: "画板", p: 68, t: "4K", i: "" }, { b: "蒙玛特", n: "画架", p: 188, t: "木质", i: "" }, { b: "青竹", n: "画框", p: 88, t: "A4", i: "" }, { b: "康颂", n: "水彩纸", p: 128, t: "300g", i: "" },
            { b: "宝虹", n: "水彩本", p: 88, t: "16开", i: "" }, { b: "莫奈", n: "素描本", p: 48, t: "速写", i: "" }, { b: "玛丽", n: "油画布", p: 158, t: "50x60", i: "" }, { b: "凤凰", n: "国画颜料", p: 88, t: "12色", i: "" },
            { b: "吴竹", n: "毛笔", p: 128, t: "狼毫", i: "" }, { b: "曹素功", n: "墨汁", p: 38, t: "250ml", i: "" }, { b: "荣宝斋", n: "宣纸", p: 88, t: "四尺", i: "" }, { b: "红星", n: "宣纸", p: 128, t: "生宣", i: "" },
            { b: "Copic", n: "马克笔", p: 388, t: "72色", i: "" }, { b: "Touch", n: "马克笔", p: 268, t: "80色", i: "" }, { b: "法卡勒", n: "水溶彩铅", p: 188, t: "48色", i: "" }, { b: "雄狮", n: "粉彩", p: 128, t: "36色", i: "" },
            { b: "美捷乐", n: "丙烯颜料", p: 88, t: "12色", i: "" }, { b: "青竹", n: "调色盘", p: 28, t: "塑料", i: "" }, { b: "蒙玛特", n: "画笔套装", p: 88, t: "12支", i: "" }, { b: "樱花", n: "橡皮", p: 18, t: "可塑", i: "" },
            { b: "施德楼", n: "橡皮擦", p: 12, t: "Mars", i: "" }, { b: "三菱", n: "橡皮", p: 15, t: "Boxy", i: "" }, { b: "晨光", n: "美工刀", p: 8, t: "大号", i: "" }, { b: "得力", n: "剪刀", p: 12, t: "不锈钢", i: "" },
            { b: "马培德", n: "圆规", p: 28, t: "金属", i: "" }, { b: "晨光", n: "直尺", p: 5, t: "30cm", i: "" }, { b: "得力", n: "三角板", p: 8, t: "套装", i: "" }, { b: "施德楼", n: "量角器", p: 12, t: "180度", i: "" },
            { b: "蒙玛特", n: "调色刀", p: 38, t: "5支装", i: "" }, { b: "青竹", n: "海绵", p: 18, t: "上色", i: "" }, { b: "马利", n: "松节油", p: 28, t: "100ml", i: "" }, { b: "温莎牛顿", n: "调色油", p: 48, t: "75ml", i: "" },
            { b: "晨光", n: "2B铅笔", p: 12, t: "12支", i: "" }, { b: "马利", n: "丙烯", p: 128, t: "18色", i: "" }, { b: "温莎牛顿", n: "艺术家", p: 288, t: "24色", i: "" }, { b: "樱花", n: "软头", p: 188, t: "48色", i: "" },
            { b: "辉柏嘉", n: "红盒", p: 168, t: "60色", i: "" }, { b: "施德楼", n: "925", p: 68, t: "0.7mm", i: "" }, { b: "三菱", n: "Uni", p: 108, t: "12支", i: "" }, { b: "百乐", n: "Custom", p: 188, t: "74", i: "" },
            { b: "凌美", n: "2000", p: 1888, t: "钢笔", i: "" }, { b: "派克", n: "Duofold", p: 3888, t: "Centennial", i: "" }, { b: "万宝龙", n: "149", p: 5888, t: "大班", i: "" }, { b: "英雄", n: "100", p: 188, t: "钢笔", i: "" },
            { b: "得力", n: "8K画板", p: 88, t: "木质", i: "" }, { b: "蒙玛特", n: "铝合金", p: 288, t: "画架", i: "" }, { b: "青竹", n: "8K画框", p: 128, t: "实木", i: "" }, { b: "康颂", n: "CANSON", p: 168, t: "300g", i: "" },
            { b: "宝虹", n: "32K", p: 108, t: "水彩本", i: "" }, { b: "莫奈", n: "速写", p: 68, t: "A5", i: "" }
        ,
            { b: "晨光", n: "素描铅笔", p: 38, t: "18支装", i: "" }, { b: "马利", n: "水彩颜料", p: 88, t: "36色", i: "" }, { b: "温莎牛顿", n: "油画颜料", p: 228, t: "18色", i: "" }, { b: "樱花", n: "马克笔", p: 198, t: "80色", i: "" },
            { b: "辉柏嘉", n: "彩铅", p: 158, t: "60色", i: "" }, { b: "施德楼", n: "自动铅笔", p: 58, t: "0.7mm", i: "" }, { b: "三菱", n: "针管笔", p: 108, t: "12支装", i: "" }, { b: "百乐", n: "钢笔", p: 148, t: "88G", i: "" },
            { b: "宝虹", n: "16K", p: 128, t: "水彩本", i: "" }, { b: "莫奈", n: "速写", p: 88, t: "A4", i: "" }, { b: "凌美", n: "2000", p: 2088, t: "钢笔", i: "" }, { b: "派克", n: "Duofold", p: 4088, t: "Centennial", i: "" }
        ],
        'wat': [
            { b: "速比涛", n: "泳衣", p: 288, t: "连体", i: "" }, { b: "阿瑞娜", n: "泳裤", p: 158, t: "专业", i: "" }, { b: "李宁", n: "泳镜", p: 88, t: "防雾", i: "" }, { b: "361°", n: "泳帽", p: 38, t: "硅胶", i: "" },
            { b: "洲克", n: "游泳圈", p: 48, t: "成人", i: "" }, { b: "Intex", n: "充气泳池", p: 388, t: "家庭", i: "" }, { b: "拓胜", n: "浮板", p: 38, t: "EVA", i: "" }, { b: "佑游", n: "脚蹼", p: 128, t: "训练", i: "" },
            { b: "迪卡侬", n: "潜水面镜", p: 188, t: "全干式", i: "" }, { b: "Cressi", n: "呼吸管", p: 158, t: "干式", i: "" }, { b: "Mares", n: "潜水服", p: 888, t: "3mm", i: "" }, { b: "Scubapro", n: "潜水电脑", p: 2888, t: "专业", i: "" },
            { b: "Suunto", n: "潜水表", p: 3888, t: "D5", i: "" }, { b: "Garmin", n: "潜水表", p: 4888, t: "Descent", i: "" }, { b: "Oceanic", n: "调节器", p: 2888, t: "二级头", i: "" }, { b: "Aqua Lung", n: "BCD", p: 3888, t: "浮力背心", i: "" },
            { b: "Billabong", n: "冲浪板", p: 1888, t: "短板", i: "" }, { b: "Quiksilver", n: "冲浪服", p: 588, t: "防寒", i: "" }, { b: "Rip Curl", n: "冲浪裤", p: 388, t: "速干", i: "" }, { b: "ONeill", n: "冲浪鞋", p: 188, t: "防滑", i: "" },
            { b: "Starboard", n: "桨板", p: 3888, t: "SUP", i: "" }, { b: "Red Paddle", n: "充气桨板", p: 5888, t: "便携", i: "" }, { b: "Naish", n: "风帆板", p: 8888, t: "专业", i: "" }, { b: "Fanatic", n: "风筝板", p: 6888, t: "Kite", i: "" },
            { b: "Sea-Doo", n: "水上摩托", p: 88888, t: "GTX", i: "" }, { b: "Yamaha", n: "摩托艇", p: 128888, t: "VX", i: "" }, { b: "Kawasaki", n: "水上飞机", p: 158888, t: "Ultra", i: "" }, { b: "Polaris", n: "水上摩托", p: 98888, t: "MSX", i: "" },
            { b: "O'Brien", n: "滑水板", p: 1888, t: "双板", i: "" }, { b: "HO Sports", n: "滑水绳", p: 388, t: "专业", i: "" }, { b: "Connelly", n: "滑水衣", p: 588, t: "救生", i: "" }, { b: "Radar", n: "滑水手套", p: 288, t: "防滑", i: "" },
            { b: "Jobe", n: "香蕉船", p: 2888, t: "3人", i: "" }, { b: "Airhead", n: "拖曳圈", p: 888, t: "单人", i: "" }, { b: "WOW", n: "飞鱼", p: 1888, t: "充气", i: "" }, { b: "Sportsstuff", n: "水上沙发", p: 1288, t: "4人", i: "" },
            { b: "Aquaglide", n: "水上蹦床", p: 5888, t: "大型", i: "" }, { b: "Rave", n: "水上滑梯", p: 8888, t: "充气", i: "" }, { b: "Bestway", n: "水上乐园", p: 3888, t: "家用", i: "" }, { b: "Intex", n: "漂流艇", p: 688, t: "4人", i: "" },
            { b: "速比涛", n: "Fastskin", p: 388, t: "竞速", i: "" }, { b: "阿瑞娜", n: "Carbon", p: 288, t: "专业", i: "" }, { b: "李宁", n: "LN", p: 128, t: "训练", i: "" }, { b: "361°", n: "361", p: 68, t: "硅胶", i: "" },
            { b: "洲克", n: "ZOKE", p: 68, t: "成人", i: "" }, { b: "Intex", n: "Easy", p: 488, t: "家庭", i: "" }, { b: "拓胜", n: "TOSWIM", p: 58, t: "EVA", i: "" }, { b: "佑游", n: "Youyou", p: 168, t: "训练", i: "" },
            { b: "迪卡侬", n: "Subea", p: 228, t: "全干式", i: "" }, { b: "Cressi", n: "Supernova", p: 198, t: "干式", i: "" }, { b: "Mares", n: "Prestige", p: 1088, t: "5mm", i: "" }, { b: "Scubapro", n: "MK25", p: 3888, t: "调节器", i: "" },
            { b: "Suunto", n: "D6i", p: 4888, t: "潜水表", i: "" }, { b: "Garmin", n: "Descent", p: 5888, t: "Mk2i", i: "" }, { b: "Oceanic", n: "Alpha", p: 3288, t: "调节器", i: "" }, { b: "Aqua Lung", n: "Dimension", p: 4888, t: "BCD", i: "" },
            { b: "Billabong", n: "Surfboard", p: 2288, t: "长板", i: "" }, { b: "Quiksilver", n: "Wetsuit", p: 788, t: "防寒", i: "" }
        ,
            { b: "速比涛", n: "泳衣", p: 328, t: "连体", i: "" }, { b: "阿瑞娜", n: "泳裤", p: 188, t: "专业", i: "" }, { b: "李宁", n: "泳镜", p: 108, t: "防雾", i: "" }, { b: "361°", n: "泳帽", p: 48, t: "硅胶", i: "" },
            { b: "洲克", n: "游泳圈", p: 68, t: "成人", i: "" }, { b: "Intex", n: "充气泳池", p: 488, t: "家庭", i: "" }, { b: "拓胜", n: "浮板", p: 48, t: "EVA", i: "" }, { b: "佑游", n: "脚蹼", p: 148, t: "训练", i: "" },
            { b: "迪卡侬", n: "潜水面镜", p: 228, t: "全干式", i: "" }, { b: "Cressi", n: "呼吸管", p: 188, t: "干式", i: "" }, { b: "Mares", n: "潜水服", p: 988, t: "3mm", i: "" }, { b: "Scubapro", n: "潜水电脑", p: 3188, t: "专业", i: "" }
        ],
        'gam': [
            { b: "任天堂", n: "Switch主机", p: 2099, t: "续航增强", i: "" }, { b: "索尼", n: "PS5", p: 3899, t: "光驱版", i: "" }, { b: "微软", n: "Xbox Series X", p: 3699, t: "1TB", i: "" }, { b: "Valve", n: "Steam Deck", p: 3299, t: "512GB", i: "" },
            { b: "任天堂", n: "塞尔达", p: 399, t: "王国之泪", i: "" }, { b: "任天堂", n: "马里奥", p: 399, t: "奥德赛", i: "" }, { b: "任天堂", n: "宝可梦", p: 399, t: "朱紫", i: "" }, { b: "任天堂", n: "喷射战士", p: 399, t: "3", i: "" },
            { b: "索尼", n: "战神", p: 468, t: "诸神黄昏", i: "" }, { b: "索尼", n: "地平线", p: 468, t: "西之绝境", i: "" }, { b: "索尼", n: "最后生还者", p: 468, t: "Part II", i: "" }, { b: "索尼", n: "蜘蛛侠", p: 468, t: "迈尔斯", i: "" },
            { b: "微软", n: "光环", p: 388, t: "无限", i: "" }, { b: "微软", n: "极限竞速", p: 388, t: "地平线5", i: "" }, { b: "微软", n: "战争机器", p: 388, t: "5", i: "" }, { b: "微软", n: "盗贼之海", p: 388, t: "周年版", i: "" },
            { b: "EA", n: "FIFA 24", p: 468, t: "足球", i: "" }, { b: "2K", n: "NBA 2K24", p: 388, t: "篮球", i: "" }, { b: "Ubisoft", n: "刺客信条", p: 388, t: "幻景", i: "" }, { b: "Activision", n: "使命召唤", p: 468, t: "现代战争", i: "" },
            { b: "Rockstar", n: "GTA 5", p: 128, t: "高级版", i: "" }, { b: "CD Projekt", n: "赛博朋克", p: 298, t: "2077", i: "" }, { b: "FromSoftware", n: "艾尔登法环", p: 298, t: "ARPG", i: "" }, { b: "卡普空", n: "怪物猎人", p: 388, t: "崛起", i: "" },
            { b: "Square Enix", n: "最终幻想", p: 468, t: "XVI", i: "" }, { b: "万代南梦宫", n: "艾尔登法环", p: 298, t: "DLC", i: "" }, { b: "科乐美", n: "实况足球", p: 198, t: "2024", i: "" }, { b: "世嘉", n: "索尼克", p: 298, t: "未知边境", i: "" },
            { b: "暴雪", n: "守望先锋", p: 198, t: "2", i: "" }, { b: "拳头", n: "英雄联盟", p: 0, t: "免费", i: "" }, { b: "Valve", n: "Dota 2", p: 0, t: "免费", i: "" }, { b: "Epic", n: "堡垒之夜", p: 0, t: "免费", i: "" },
            { b: "米哈游", n: "原神", p: 0, t: "免费", i: "" }, { b: "米哈游", n: "崩坏星穹铁道", p: 0, t: "免费", i: "" }, { b: "网易", n: "逆水寒", p: 0, t: "免费", i: "" }, { b: "腾讯", n: "王者荣耀", p: 0, t: "免费", i: "" },
            { b: "腾讯", n: "和平精英", p: 0, t: "免费", i: "" }, { b: "莉莉丝", n: "万国觉醒", p: 0, t: "免费", i: "" }, { b: "鹰角", n: "明日方舟", p: 0, t: "免费", i: "" }, { b: "鹰角", n: "泰拉瑞亚", p: 88, t: "沙盒", i: "" },
            { b: "任天堂", n: "Switch Lite", p: 1299, t: "便携", i: "" }, { b: "索尼", n: "PS5 Slim", p: 3299, t: "数字版", i: "" }, { b: "微软", n: "Xbox Series S", p: 2299, t: "512GB", i: "" }, { b: "Valve", n: "Steam Deck OLED", p: 3999, t: "1TB", i: "" },
            { b: "任天堂", n: "超级马里奥", p: 399, t: "Wonder", i: "" }, { b: "任天堂", n: "塞尔达", p: 399, t: "天空之剑", i: "" }, { b: "任天堂", n: "宝可梦", p: 399, t: "剑盾", i: "" }, { b: "任天堂", n: "动物森友会", p: 399, t: "新视野", i: "" },
            { b: "索尼", n: "对马岛", p: 468, t: "之魂", i: "" }, { b: "索尼", n: "恶魔之魂", p: 468, t: "重制", i: "" }, { b: "索尼", n: "瑞奇与叮当", p: 468, t: "时空", i: "" }, { b: "索尼", n: "Returnal", p: 468, t: "PS5", i: "" },
            { b: "微软", n: "Forza", p: 388, t: "Motorsport", i: "" }, { b: "微软", n: "Starfield", p: 388, t: "星空", i: "" }, { b: "微软", n: "Hi-Fi Rush", p: 198, t: "节奏", i: "" }, { b: "微软", n: "Pentiment", p: 128, t: "冒险", i: "" },
            { b: "EA", n: "Madden", p: 468, t: "24", i: "" }, { b: "2K", n: "WWE", p: 388, t: "2K24", i: "" }, { b: "Ubisoft", n: "看门狗", p: 388, t: "军团", i: "" }, { b: "Activision", n: "暗黑破坏神", p: 468, t: "4", i: "" }
        ,
            { b: "任天堂", n: "Switch主机", p: 2299, t: "续航增强", i: "" }, { b: "索尼", n: "PS5", p: 4099, t: "光驱版", i: "" }, { b: "微软", n: "Xbox Series X", p: 3899, t: "1TB", i: "" }, { b: "Valve", n: "Steam Deck", p: 3499, t: "512GB", i: "" },
            { b: "任天堂", n: "塞尔达", p: 499, t: "王国之泪", i: "" }, { b: "任天堂", n: "马里奥", p: 499, t: "奥德赛", i: "" }, { b: "任天堂", n: "宝可梦", p: 499, t: "朱紫", i: "" }, { b: "任天堂", n: "喷射战士", p: 499, t: "3", i: "" },
            { b: "索尼", n: "战神", p: 568, t: "诸神黄昏", i: "" }, { b: "索尼", n: "地平线", p: 568, t: "西之绝境", i: "" }, { b: "索尼", n: "最后生还者", p: 568, t: "重制版", i: "" }, { b: "索尼", n: "漫威蜘蛛侠", p: 568, t: "2", i: "" }
        ],
        'pet': [
            { b: "皇家", n: "狗粮", p: 388, t: "10kg", i: "" }, { b: "冠能", n: "狗粮", p: 288, t: "中型犬", i: "" }, { b: "比瑞吉", n: "狗粮", p: 188, t: "小型犬", i: "" }, { b: "宝路", n: "狗粮", p: 128, t: "成犬", i: "" },
            { b: "皇家", n: "猫粮", p: 328, t: "10kg", i: "" }, { b: "渴望", n: "猫粮", p: 588, t: "无谷", i: "" }, { b: "爱肯拿", n: "猫粮", p: 488, t: "鸡肉", i: "" }, { b: "伟嘉", n: "猫粮", p: 88, t: "成猫", i: "" },
            { b: "麦富迪", n: "猫罐头", p: 48, t: "金枪鱼", i: "" }, { b: "珍致", n: "猫罐头", p: 38, t: "鸡肉", i: "" }, { b: "喜跃", n: "猫零食", p: 28, t: "妙鲜包", i: "" }, { b: "CIAO", n: "猫条", p: 58, t: "日本", i: "" },
            { b: "顽皮", n: "狗罐头", p: 38, t: "牛肉", i: "" }, { b: "宝路", n: "狗零食", p: 28, t: "肉干", i: "" }, { b: "耐威克", n: "磨牙棒", p: 48, t: "洁齿", i: "" }, { b: "好主人", n: "狗咬胶", p: 38, t: "牛皮", i: "" },
            { b: "膨润土", n: "猫砂", p: 58, t: "10L", i: "" }, { b: "豆腐猫砂", n: "猫砂", p: 88, t: "6L", i: "" }, { b: "水晶猫砂", n: "猫砂", p: 68, t: "硅胶", i: "" }, { b: "松木猫砂", n: "猫砂", p: 78, t: "天然", i: "" },
            { b: "IRIS", n: "猫砂盆", p: 128, t: "全封闭", i: "" }, { b: "利其尔", n: "猫砂盆", p: 188, t: "双层", i: "" }, { b: "拓荒者", n: "猫砂盆", p: 288, t: "自动", i: "" }, { b: "小佩", n: "猫砂盆", p: 388, t: "智能", i: "" },
            { b: "Petkit", n: "自动喂食器", p: 388, t: "智能", i: "" }, { b: "小佩", n: "饮水机", p: 188, t: "循环", i: "" }, { b: "多格漫", n: "宠物窝", p: 128, t: "猫窝", i: "" }, { b: "怡亲", n: "狗窝", p: 158, t: "中型", i: "" },
            { b: "福来恩", n: "驱虫药", p: 128, t: "体外", i: "" }, { b: "拜耳", n: "驱虫药", p: 88, t: "体内", i: "" }, { b: "大宠爱", n: "驱虫药", p: 158, t: "内外同驱", i: "" }, { b: "爱沃克", n: "驱虫药", p: 188, t: "猫用", i: "" },
            { b: "维克", n: "洗耳液", p: 48, t: "清洁", i: "" }, { b: "圣路薇", n: "沐浴露", p: 88, t: "狗用", i: "" }, { b: "雪貂", n: "猫沐浴露", p: 68, t: "除臭", i: "" }, { b: "顶尖", n: "宠物香波", p: 58, t: "美毛", i: "" },
            { b: "富美内特", n: "指甲剪", p: 38, t: "专业", i: "" }, { b: "贝壳", n: "梳子", p: 48, t: "脱毛梳", i: "" }, { b: "爱丽丝", n: "猫抓板", p: 28, t: "瓦楞纸", i: "" }, { b: "猫乐适", n: "猫爬架", p: 288, t: "多层", i: "" },
            { b: "逗猫棒", n: "玩具", p: 18, t: "羽毛", i: "" }, { b: "激光笔", n: "玩具", p: 28, t: "红外", i: "" }, { b: "Kong", n: "狗玩具", p: 88, t: "耐咬", i: "" }, { b: "飞盘", n: "玩具", p: 38, t: "训练", i: "" },
            { b: "皇家", n: "幼犬", p: 428, t: "12kg", i: "" }, { b: "冠能", n: "大型犬", p: 388, t: "15kg", i: "" }, { b: "比瑞吉", n: "全价", p: 228, t: "20kg", i: "" }, { b: "宝路", n: "幼犬", p: 158, t: "成犬", i: "" },
            { b: "皇家", n: "幼猫", p: 368, t: "10kg", i: "" }, { b: "渴望", n: "六种鱼", p: 688, t: "无谷", i: "" }, { b: "爱肯拿", n: "鸭肉", p: 588, t: "无谷", i: "" }, { b: "伟嘉", n: "幼猫", p: 108, t: "成猫", i: "" },
            { b: "麦富迪", n: "三文鱼", p: 58, t: "猫罐头", i: "" }, { b: "珍致", n: "金枪鱼", p: 48, t: "猫罐头", i: "" }, { b: "喜跃", n: "妙鲜包", p: 38, t: "猫零食", i: "" }, { b: "CIAO", n: "猫条", p: 68, t: "日本", i: "" },
            { b: "顽皮", n: "鸡肉", p: 48, t: "狗罐头", i: "" }, { b: "宝路", n: "洁齿", p: 38, t: "狗零食", i: "" }, { b: "耐威克", n: "洁齿", p: 58, t: "磨牙棒", i: "" }, { b: "好主人", n: "牛皮", p: 48, t: "狗咬胶", i: "" },
            { b: "膨润土", n: "原味", p: 68, t: "10L", i: "" }, { b: "豆腐猫砂", n: "绿茶", p: 98, t: "6L", i: "" }, { b: "水晶猫砂", n: "除臭", p: 78, t: "硅胶", i: "" }, { b: "松木猫砂", n: "天然", p: 88, t: "10L", i: "" }
        ,
            { b: "皇家", n: "狗粮", p: 428, t: "12kg", i: "" }, { b: "冠能", n: "狗粮", p: 328, t: "中型犬", i: "" }, { b: "比瑞吉", n: "狗粮", p: 228, t: "小型犬", i: "" }, { b: "宝路", n: "狗粮", p: 148, t: "成犬", i: "" },
            { b: "皇家", n: "猫粮", p: 368, t: "12kg", i: "" }, { b: "渴望", n: "猫粮", p: 628, t: "无谷", i: "" }, { b: "爱肯拿", n: "猫粮", p: 528, t: "鸡肉", i: "" }, { b: "伟嘉", n: "猫粮", p: 108, t: "成猫", i: "" },
            { b: "膨润土", n: "原味", p: 78, t: "12L", i: "" }, { b: "豆腐猫砂", n: "绿茶", p: 108, t: "8L", i: "" }, { b: "水晶猫砂", n: "除臭", p: 88, t: "硅胶", i: "" }, { b: "松木猫砂", n: "天然", p: 98, t: "12L", i: "" }
        ],
        'gard': [
            { b: "花花草草", n: "月季", p: 58, t: "盆栽", i: "" }, { b: "绿植", n: "多肉", p: 28, t: "组合", i: "" }, { b: "种子", n: "番茄", p: 18, t: "蔬菜", i: "" }, { b: "肥料", n: "有机肥", p: 38, t: "5kg", i: "" },
            { b: "工具", n: "铲子", p: 28, t: "园艺", i: "" }, { b: "工具", n: "剪刀", p: 48, t: "修枝", i: "" }, { b: "花盆", n: "陶瓷盆", p: 38, t: "大号", i: "" }, { b: "花盆", n: "塑料盆", p: 18, t: "中号", i: "" },
            { b: "土壤", n: "营养土", p: 28, t: "10L", i: "" }, { b: "土壤", n: "泥炭土", p: 38, t: "专用", i: "" }, { b: "浇水", n: "喷壶", p: 28, t: "2L", i: "" }, { b: "浇水", n: "水管", p: 88, t: "20m", i: "" },
            { b: "支架", n: "爬藤架", p: 58, t: "铁艺", i: "" }, { b: "支架", n: "花架", p: 128, t: "木质", i: "" }, { b: "装饰", n: "园艺灯", p: 88, t: "太阳能", i: "" }, { b: "装饰", n: "风车", p: 48, t: "彩色", i: "" },
            { b: "防护", n: "防虫网", p: 38, t: "5m", i: "" }, { b: "防护", n: "遮阳网", p: 58, t: "黑色", i: "" }, { b: "农药", n: "杀虫剂", p: 28, t: "环保", i: "" }, { b: "农药", n: "除草剂", p: 38, t: "500ml", i: "" },
            { b: "种植", n: "育苗盘", p: 18, t: "72孔", i: "" }, { b: "种植", n: "营养钵", p: 28, t: "100个", i: "" }, { b: "工具", n: "锄头", p: 48, t: "小型", i: "" }, { b: "工具", n: "耙子", p: 38, t: "园艺", i: "" },
            { b: "浇灌", n: "滴灌", p: 128, t: "套装", i: "" }, { b: "浇灌", n: "喷头", p: 28, t: "可调", i: "" }, { b: "温室", n: "小温室", p: 288, t: "家用", i: "" }, { b: "温室", n: "育苗箱", p: 88, t: "保温", i: "" },
            { b: "肥料", n: "复合肥", p: 48, t: "通用", i: "" }, { b: "肥料", n: "花肥", p: 38, t: "液体", i: "" }, { b: "工具", n: "手套", p: 18, t: "防刺", i: "" }, { b: "工具", n: "围裙", p: 28, t: "防水", i: "" },
            { b: "装饰", n: "假山石", p: 88, t: "造景", i: "" }, { b: "装饰", n: "鹅卵石", p: 38, t: "5kg", i: "" }, { b: "种子", n: "花种", p: 28, t: "混合", i: "" }, { b: "种子", n: "草种", p: 38, t: "草坪", i: "" },
            { b: "工具", n: "喷雾器", p: 58, t: "手动", i: "" }, { b: "工具", n: "施肥器", p: 48, t: "撒肥", i: "" }, { b: "防护", n: "护膝", p: 28, t: "园艺", i: "" }, { b: "防护", n: "帽子", p: 38, t: "遮阳", i: "" },
            { b: "花花草草", n: "玫瑰", p: 68, t: "盆栽", i: "" }, { b: "绿植", n: "绿萝", p: 38, t: "水培", i: "" }, { b: "种子", n: "辣椒", p: 28, t: "蔬菜", i: "" }, { b: "肥料", n: "复合肥", p: 48, t: "10kg", i: "" },
            { b: "工具", n: "小铲", p: 38, t: "园艺", i: "" }, { b: "工具", n: "修枝剪", p: 58, t: "专业", i: "" }, { b: "花盆", n: "紫砂盆", p: 58, t: "大号", i: "" }, { b: "花盆", n: "加仑盆", p: 28, t: "5加仑", i: "" },
            { b: "土壤", n: "椰糠", p: 38, t: "10L", i: "" }, { b: "土壤", n: "珍珠岩", p: 28, t: "5L", i: "" }, { b: "浇水", n: "自动", p: 48, t: "3L", i: "" }, { b: "浇水", n: "软管", p: 98, t: "30m", i: "" },
            { b: "支架", n: "花架", p: 138, t: "铁艺", i: "" }, { b: "支架", n: "多层", p: 188, t: "木质", i: "" }, { b: "装饰", n: "LED", p: 108, t: "太阳能", i: "" }, { b: "装饰", n: "风铃", p: 58, t: "彩色", i: "" },
            { b: "防护", n: "防虫", p: 48, t: "10m", i: "" }, { b: "防护", n: "遮阳", p: 68, t: "银色", i: "" }, { b: "农药", n: "杀菌", p: 38, t: "环保", i: "" }, { b: "农药", n: "除虫", p: 48, t: "500ml", i: "" }
        ,
            { b: "花花草草", n: "月季", p: 68, t: "盆栽", i: "" }, { b: "绿植", n: "多肉", p: 38, t: "组合", i: "" }, { b: "种子", n: "番茄", p: 28, t: "蔬菜", i: "" }, { b: "肥料", n: "有机肥", p: 48, t: "10kg", i: "" },
            { b: "工具", n: "铲子", p: 38, t: "园艺", i: "" }, { b: "工具", n: "剪刀", p: 58, t: "修枝", i: "" }, { b: "花盆", n: "陶瓷盆", p: 48, t: "大号", i: "" }, { b: "花盆", n: "塑料盆", p: 28, t: "中号", i: "" },
            { b: "防护", n: "防虫", p: 58, t: "15m", i: "" }, { b: "防护", n: "遮阳", p: 78, t: "银色", i: "" }, { b: "农药", n: "杀菌", p: 48, t: "环保", i: "" }, { b: "农药", n: "除虫", p: 58, t: "600ml", i: "" }
        ],
        'bag': [
            { b: "新秀丽", n: "拉杆箱", p: 688, t: "20寸", i: "" }, { b: "外交官", n: "行李箱", p: 488, t: "24寸", i: "" }, { b: "汉客", n: "旅行箱", p: 388, t: "28寸", i: "" }, { b: "爱华仕", n: "登机箱", p: 288, t: "18寸", i: "" },
            { b: "威豹", n: "拉杆箱", p: 588, t: "铝框", i: "" }, { b: "ITO", n: "行李箱", p: 888, t: "日本", i: "" }, { b: "地平线8号", n: "旅行箱", p: 488, t: "PC", i: "" }, { b: "90分", n: "登机箱", p: 388, t: "小米", i: "" },
            { b: "Rimowa", n: "铝镁箱", p: 5888, t: "德国", i: "" }, { b: "途明", n: "拉杆箱", p: 2888, t: "美国", i: "" }, { b: "日默瓦", n: "行李箱", p: 6888, t: "经典", i: "" }, { b: "LV", n: "旅行箱", p: 28888, t: "奢侈", i: "" },
            { b: "北面", n: "登山包", p: 688, t: "60L", i: "" }, { b: "始祖鸟", n: "户外包", p: 1288, t: "45L", i: "" }, { b: "鱼鹰", n: "徒步包", p: 888, t: "50L", i: "" }, { b: "格里高利", n: "背包", p: 1088, t: "55L", i: "" },
            { b: "迪卡侬", n: "旅行包", p: 188, t: "30L", i: "" }, { b: "骆驼", n: "登山包", p: 288, t: "40L", i: "" }, { b: "探路者", n: "户外包", p: 388, t: "35L", i: "" }, { b: "牧高笛", n: "背包", p: 258, t: "25L", i: "" },
            { b: "新秀丽", n: "双肩包", p: 388, t: "商务", i: "" }, { b: "威豹", n: "电脑包", p: 288, t: "15寸", i: "" }, { b: "汉客", n: "背包", p: 188, t: "休闲", i: "" }, { b: "90分", n: "双肩包", p: 158, t: "通勤", i: "" },
            { b: "Tumi", n: "公文包", p: 3888, t: "真皮", i: "" }, { b: "新秀丽", n: "商务包", p: 888, t: "牛津布", i: "" }, { b: "外交官", n: "手提包", p: 588, t: "出差", i: "" }, { b: "爱华仕", n: "单肩包", p: 288, t: "斜挎", i: "" },
            { b: "Longchamp", n: "饺子包", p: 888, t: "法国", i: "" }, { b: "Kipling", n: "斜挎包", p: 488, t: "尼龙", i: "" }, { b: "Herschel", n: "双肩包", p: 588, t: "潮牌", i: "" }, { b: "Fjallraven", n: "书包", p: 688, t: "瑞典", i: "" },
            { b: "小米", n: "旅行包", p: 128, t: "折叠", i: "" }, { b: "网易严选", n: "行李包", p: 158, t: "大容量", i: "" }, { b: "优衣库", n: "旅行袋", p: 88, t: "轻便", i: "" }, { b: "无印良品", n: "收纳包", p: 128, t: "简约", i: "" },
            { b: "爱马仕", n: "旅行袋", p: 38888, t: "奢侈", i: "" }, { b: "LV", n: "手提包", p: 18888, t: "经典", i: "" }, { b: "Gucci", n: "旅行包", p: 15888, t: "意大利", i: "" }, { b: "Prada", n: "行李袋", p: 12888, t: "尼龙", i: "" },
            { b: "新秀丽", n: "Cosmolite", p: 888, t: "20寸", i: "" }, { b: "外交官", n: "Diplomat", p: 688, t: "24寸", i: "" }, { b: "汉客", n: "Hanke", p: 488, t: "28寸", i: "" }, { b: "爱华仕", n: "Oiwoss", p: 388, t: "18寸", i: "" },
            { b: "威豹", n: "Winpard", p: 688, t: "铝框", i: "" }, { b: "ITO", n: "Ginkgo", p: 1088, t: "日本", i: "" }, { b: "地平线8号", n: "LEVEL8", p: 588, t: "PC", i: "" }, { b: "90分", n: "NINETY", p: 488, t: "小米", i: "" },
            { b: "Rimowa", n: "Original", p: 6888, t: "德国", i: "" }, { b: "途明", n: "Tumi", p: 3888, t: "美国", i: "" }, { b: "日默瓦", n: "Classic", p: 7888, t: "经典", i: "" }, { b: "LV", n: "Horizon", p: 38888, t: "奢侈", i: "" },
            { b: "北面", n: "Base Camp", p: 888, t: "70L", i: "" }, { b: "始祖鸟", n: "Bora", p: 1888, t: "65L", i: "" }, { b: "鱼鹰", n: "Aether", p: 1088, t: "60L", i: "" }, { b: "格里高利", n: "Baltoro", p: 1288, t: "75L", i: "" },
            { b: "迪卡侬", n: "Quechua", p: 288, t: "40L", i: "" }, { b: "骆驼", n: "Camel", p: 388, t: "50L", i: "" }
        ,
            { b: "新秀丽", n: "拉杆箱", p: 788, t: "24寸", i: "" }, { b: "外交官", n: "行李箱", p: 588, t: "28寸", i: "" }, { b: "汉客", n: "旅行箱", p: 488, t: "32寸", i: "" }, { b: "爱华仕", n: "登机箱", p: 328, t: "20寸", i: "" },
            { b: "威豹", n: "拉杆箱", p: 688, t: "铝框", i: "" }, { b: "ITO", n: "行李箱", p: 988, t: "日本", i: "" }, { b: "地平线8号", n: "旅行箱", p: 588, t: "PC", i: "" }, { b: "90分", n: "登机箱", p: 488, t: "小米", i: "" },
            { b: "迪卡侬", n: "Quechua", p: 328, t: "50L", i: "" }, { b: "骆驼", n: "Camel", p: 428, t: "60L", i: "" }, { b: "新秀丽", n: "拉杆箱", p: 888, t: "26寸", i: "" }, { b: "外交官", n: "行李箱", p: 688, t: "30寸", i: "" }
        ],
        'out': [
            { b: "北面", n: "冲锋衣", p: 1288, t: "防水", i: "" }, { b: "始祖鸟", n: "软壳", p: 2888, t: "透气", i: "" }, { b: "巴塔哥尼亚", n: "抓绒", p: 888, t: "保暖", i: "" }, { b: "哥伦比亚", n: "羽绒服", p: 1588, t: "户外", i: "" },
            { b: "探路者", n: "冲锋衣", p: 588, t: "三合一", i: "" }, { b: "骆驼", n: "登山服", p: 388, t: "速干", i: "" }, { b: "迪卡侬", n: "户外裤", p: 188, t: "快干", i: "" }, { b: "牧高笛", n: "冲锋裤", p: 288, t: "防风", i: "" },
            { b: "Salomon", n: "越野鞋", p: 888, t: "防滑", i: "" }, { b: "Merrell", n: "登山鞋", p: 688, t: "防水", i: "" }, { b: "Keen", n: "徒步鞋", p: 588, t: "透气", i: "" }, { b: "Scarpa", n: "攀岩鞋", p: 1288, t: "专业", i: "" },
            { b: "Black Diamond", n: "登山杖", p: 388, t: "碳纤维", i: "" }, { b: "Leki", n: "手杖", p: 488, t: "铝合金", i: "" }, { b: "迪卡侬", n: "登山杖", p: 128, t: "折叠", i: "" }, { b: "探路者", n: "手杖", p: 188, t: "伸缩", i: "" },
            { b: "牧高笛", n: "帐篷", p: 588, t: "2人", i: "" }, { b: "探路者", n: "帐篷", p: 888, t: "3人", i: "" }, { b: "骆驼", n: "帐篷", p: 388, t: "单人", i: "" }, { b: "迪卡侬", n: "帐篷", p: 288, t: "速开", i: "" },
            { b: "MSR", n: "帐篷", p: 2888, t: "四季", i: "" }, { b: "Big Agnes", n: "帐篷", p: 3888, t: "超轻", i: "" }, { b: "Hilleberg", n: "帐篷", p: 8888, t: "瑞典", i: "" }, { b: "Nemo", n: "帐篷", p: 2388, t: "美国", i: "" },
            { b: "牧高笛", n: "睡袋", p: 288, t: "信封式", i: "" }, { b: "探路者", n: "睡袋", p: 388, t: "木乃伊", i: "" }, { b: "骆驼", n: "睡袋", p: 188, t: "春秋", i: "" }, { b: "迪卡侬", n: "睡袋", p: 158, t: "夏季", i: "" },
            { b: "Marmot", n: "睡袋", p: 1888, t: "羽绒", i: "" }, { b: "Mountain Hardwear", n: "睡袋", p: 2388, t: "零下", i: "" }, { b: "Sea to Summit", n: "睡袋", p: 1588, t: "超轻", i: "" }, { b: "Western Mountaineering", n: "睡袋", p: 3888, t: "顶级", i: "" },
            { b: "迪卡侬", n: "防潮垫", p: 88, t: "泡沫", i: "" }, { b: "探路者", n: "充气垫", p: 188, t: "自动", i: "" }, { b: "牧高笛", n: "地垫", p: 128, t: "铝膜", i: "" }, { b: "骆驼", n: "防潮垫", p: 158, t: "加厚", i: "" },
            { b: "Therm-a-Rest", n: "充气垫", p: 888, t: "舒适", i: "" }, { b: "Nemo", n: "睡垫", p: 1288, t: "超轻", i: "" }, { b: "Sea to Summit", n: "充气垫", p: 688, t: "便携", i: "" }, { b: "Exped", n: "睡垫", p: 1588, t: "瑞士", i: "" },
            { b: "北面", n: "Summit", p: 1588, t: "防水", i: "" }, { b: "始祖鸟", n: "Beta", p: 3888, t: "AR", i: "" }, { b: "巴塔哥尼亚", n: "R1", p: 1088, t: "抓绒", i: "" }, { b: "哥伦比亚", n: "Titanium", p: 1888, t: "羽绒", i: "" },
            { b: "探路者", n: "Discovery", p: 688, t: "三合一", i: "" }, { b: "骆驼", n: "Camel", p: 488, t: "速干", i: "" }, { b: "迪卡侬", n: "Quechua", p: 288, t: "快干", i: "" }, { b: "牧高笛", n: "Mobi", p: 388, t: "防风", i: "" },
            { b: "Salomon", n: "Speedcross", p: 1088, t: "防滑", i: "" }, { b: "Merrell", n: "Moab", p: 888, t: "防水", i: "" }, { b: "Keen", n: "Targhee", p: 788, t: "透气", i: "" }, { b: "Scarpa", n: "Drago", p: 1588, t: "攀岩", i: "" },
            { b: "Black Diamond", n: "Distance", p: 488, t: "碳纤维", i: "" }, { b: "Leki", n: "Corklite", p: 588, t: "铝合金", i: "" }, { b: "迪卡侬", n: "Quechua", p: 188, t: "折叠", i: "" }, { b: "探路者", n: "Toread", p: 228, t: "伸缩", i: "" },
            { b: "牧高笛", n: "冷山", p: 688, t: "2人", i: "" }, { b: "探路者", n: "Discovery", p: 1088, t: "3人", i: "" }
        ,
            { b: "北面", n: "冲锋衣", p: 1388, t: "防水", i: "" }, { b: "始祖鸟", n: "软壳", p: 3088, t: "透气", i: "" }, { b: "巴塔哥尼亚", n: "抓绒", p: 988, t: "保暖", i: "" }, { b: "哥伦比亚", n: "羽绒服", p: 1688, t: "户外", i: "" },
            { b: "探路者", n: "冲锋衣", p: 688, t: "三合一", i: "" }, { b: "骆驼", n: "登山服", p: 488, t: "速干", i: "" }, { b: "迪卡侬", n: "户外裤", p: 228, t: "快干", i: "" }, { b: "牧高笛", n: "冲锋裤", p: 328, t: "防风", i: "" },
            { b: "牧高笛", n: "冷山", p: 788, t: "3人", i: "" }, { b: "探路者", n: "Discovery", p: 1188, t: "4人", i: "" }, { b: "北面", n: "冲锋衣", p: 1488, t: "防风", i: "" }, { b: "始祖鸟", n: "软壳", p: 3288, t: "透气", i: "" }
        ],
        'baby': [
            { b: "好孩子", n: "婴儿车", p: 888, t: "高景观", i: "" }, { b: "宝宝好", n: "推车", p: 588, t: "轻便", i: "" }, { b: "Combi", n: "婴儿车", p: 1288, t: "日本", i: "" }, { b: "Aprica", n: "推车", p: 1588, t: "可躺", i: "" },
            { b: "好孩子", n: "安全座椅", p: 1288, t: "0-12岁", i: "" }, { b: "Britax", n: "汽车座椅", p: 2388, t: "isofix", i: "" }, { b: "Cybex", n: "安全座椅", p: 2888, t: "德国", i: "" }, { b: "Maxi-Cosi", n: "座椅", p: 1888, t: "荷兰", i: "" },
            { b: "好孩子", n: "婴儿床", p: 688, t: "实木", i: "" }, { b: "芙儿优", n: "婴儿床", p: 888, t: "多功能", i: "" }, { b: "小龙哈彼", n: "婴儿床", p: 488, t: "拼接", i: "" }, { b: "贝影随行", n: "婴儿床", p: 588, t: "便携", i: "" },
            { b: "帮宝适", n: "纸尿裤", p: 188, t: "L码", i: "" }, { b: "花王", n: "尿不湿", p: 228, t: "M码", i: "" }, { b: "大王", n: "纸尿裤", p: 198, t: "S码", i: "" }, { b: "好奇", n: "拉拉裤", p: 168, t: "XL码", i: "" },
            { b: "贝亲", n: "奶瓶", p: 88, t: "玻璃", i: "" }, { b: "新安怡", n: "奶瓶", p: 128, t: "PPSU", i: "" }, { b: "可么多么", n: "奶瓶", p: 158, t: "硅胶", i: "" }, { b: "NUK", n: "奶瓶", p: 98, t: "宽口", i: "" },
            { b: "贝亲", n: "奶嘴", p: 28, t: "硅胶", i: "" }, { b: "新安怡", n: "奶嘴", p: 38, t: "防胀气", i: "" }, { b: "布朗博士", n: "奶嘴", p: 48, t: "美国", i: "" }, { b: "NUK", n: "安抚奶嘴", p: 38, t: "德国", i: "" },
            { b: "贝亲", n: "湿巾", p: 48, t: "80抽", i: "" }, { b: "好孩子", n: "湿巾", p: 38, t: "100抽", i: "" }, { b: "全棉时代", n: "湿巾", p: 58, t: "纯棉", i: "" }, { b: "子初", n: "湿巾", p: 28, t: "手口", i: "" },
            { b: "强生", n: "洗发水", p: 48, t: "婴儿", i: "" }, { b: "贝亲", n: "沐浴露", p: 58, t: "温和", i: "" }, { b: "哈罗闪", n: "洗护", p: 88, t: "德国", i: "" }, { b: "艾维诺", n: "润肤", p: 68, t: "燕麦", i: "" },
            { b: "好孩子", n: "学步车", p: 288, t: "多功能", i: "" }, { b: "费雪", n: "健身架", p: 188, t: "音乐", i: "" }, { b: "澳贝", n: "玩具", p: 128, t: "益智", i: "" }, { b: "火火兔", n: "早教机", p: 168, t: "故事", i: "" },
            { b: "好孩子", n: "餐椅", p: 388, t: "可调", i: "" }, { b: "宝宝好", n: "餐椅", p: 288, t: "便携", i: "" }, { b: "Stokke", n: "餐椅", p: 2888, t: "成长", i: "" }, { b: "Peg Perego", n: "餐椅", p: 1888, t: "意大利", i: "" },
            { b: "好孩子", n: "GB", p: 1088, t: "高景观", i: "" }, { b: "宝宝好", n: "BBH", p: 688, t: "轻便", i: "" }, { b: "Combi", n: "F2", p: 1588, t: "日本", i: "" }, { b: "Aprica", n: "Magical", p: 1888, t: "可躺", i: "" },
            { b: "好孩子", n: "CS", p: 1588, t: "0-12岁", i: "" }, { b: "Britax", n: "Dualfix", p: 2888, t: "isofix", i: "" }, { b: "Cybex", n: "Solution", p: 3288, t: "德国", i: "" }, { b: "Maxi-Cosi", n: "Axissfix", p: 2288, t: "荷兰", i: "" },
            { b: "好孩子", n: "MC", p: 888, t: "实木", i: "" }, { b: "芙儿优", n: "ForU", p: 1088, t: "多功能", i: "" }, { b: "小龙哈彼", n: "Happy", p: 588, t: "拼接", i: "" }, { b: "贝影随行", n: "Baby", p: 688, t: "便携", i: "" },
            { b: "帮宝适", n: "一级帮", p: 228, t: "XL码", i: "" }, { b: "花王", n: "Merries", p: 268, t: "L码", i: "" }, { b: "大王", n: "天使", p: 228, t: "M码", i: "" }, { b: "好奇", n: "铂金", p: 198, t: "XXL码", i: "" },
            { b: "贝亲", n: "宽口", p: 108, t: "玻璃", i: "" }, { b: "新安怡", n: "Natural", p: 148, t: "PPSU", i: "" }, { b: "可么多么", n: "Comotomo", p: 178, t: "硅胶", i: "" }, { b: "NUK", n: "宽口", p: 118, t: "宽口", i: "" }
        ,
            { b: "好孩子", n: "婴儿车", p: 988, t: "高景观", i: "" }, { b: "宝宝好", n: "推车", p: 688, t: "轻便", i: "" }, { b: "Combi", n: "婴儿车", p: 1388, t: "日本", i: "" }, { b: "Aprica", n: "推车", p: 1688, t: "可躺", i: "" },
            { b: "好孩子", n: "安全座椅", p: 1388, t: "0-12岁", i: "" }, { b: "Britax", n: "汽车座椅", p: 2588, t: "isofix", i: "" }, { b: "Cybex", n: "安全座椅", p: 3088, t: "德国", i: "" }, { b: "Maxi-Cosi", n: "座椅", p: 2088, t: "荷兰", i: "" },
            { b: "贝亲", n: "宽口", p: 128, t: "玻璃", i: "" }, { b: "新安怡", n: "Natural", p: 168, t: "PPSU", i: "" }, { b: "可么多么", n: "Comotomo", p: 198, t: "硅胶", i: "" }, { b: "NUK", n: "宽口", p: 138, t: "宽口", i: "" }
        ],
        'tool': [
            { b: "博世", n: "电钻", p: 388, t: "12V", i: "" }, { b: "得伟", n: "冲击钻", p: 588, t: "18V", i: "" }, { b: "牧田", n: "电锤", p: 888, t: "26mm", i: "" }, { b: "史丹利", n: "手电钻", p: 288, t: "家用", i: "" },
            { b: "博世", n: "角磨机", p: 288, t: "100mm", i: "" }, { b: "得伟", n: "切割机", p: 488, t: "125mm", i: "" }, { b: "牧田", n: "抛光机", p: 388, t: "打磨", i: "" }, { b: "史丹利", n: "砂轮机", p: 188, t: "台式", i: "" },
            { b: "博世", n: "电锯", p: 688, t: "往复锯", i: "" }, { b: "得伟", n: "圆锯", p: 588, t: "185mm", i: "" }, { b: "牧田", n: "曲线锯", p: 488, t: "木工", i: "" }, { b: "史丹利", n: "手锯", p: 88, t: "折叠", i: "" },
            { b: "世达", n: "工具箱", p: 188, t: "塑料", i: "" }, { b: "钢盾", n: "工具箱", p: 288, t: "铁质", i: "" }, { b: "史丹利", n: "工具箱", p: 388, t: "多层", i: "" }, { b: "得力", n: "工具箱", p: 128, t: "家用", i: "" },
            { b: "世达", n: "扳手套装", p: 188, t: "12件", i: "" }, { b: "钢盾", n: "套筒", p: 288, t: "46件", i: "" }, { b: "史丹利", n: "扳手", p: 88, t: "活动", i: "" }, { b: "得力", n: "扳手", p: 58, t: "梅花", i: "" },
            { b: "世达", n: "螺丝刀", p: 88, t: "套装", i: "" }, { b: "钢盾", n: "起子", p: 128, t: "精密", i: "" }, { b: "史丹利", n: "螺丝刀", p: 68, t: "十字", i: "" }, { b: "得力", n: "起子", p: 38, t: "一字", i: "" },
            { b: "世达", n: "钳子", p: 68, t: "尖嘴", i: "" }, { b: "钢盾", n: "钳子", p: 88, t: "斜口", i: "" }, { b: "史丹利", n: "钳子", p: 58, t: "水泵", i: "" }, { b: "得力", n: "钳子", p: 48, t: "剥线", i: "" },
            { b: "世达", n: "锤子", p: 58, t: "羊角", i: "" }, { b: "钢盾", n: "锤子", p: 88, t: "橡胶", i: "" }, { b: "史丹利", n: "锤子", p: 68, t: "木工", i: "" }, { b: "得力", n: "锤子", p: 38, t: "铁锤", i: "" },
            { b: "世达", n: "卷尺", p: 28, t: "5m", i: "" }, { b: "钢盾", n: "卷尺", p: 38, t: "7.5m", i: "" }, { b: "史丹利", n: "卷尺", p: 48, t: "10m", i: "" }, { b: "得力", n: "卷尺", p: 18, t: "3m", i: "" },
            { b: "博世", n: "激光测距仪", p: 388, t: "50m", i: "" }, { b: "得伟", n: "水平仪", p: 288, t: "激光", i: "" }, { b: "牧田", n: "测距仪", p: 488, t: "100m", i: "" }, { b: "史丹利", n: "水平尺", p: 88, t: "铝合金", i: "" },
            { b: "博世", n: "GSR", p: 488, t: "12V", i: "" }, { b: "得伟", n: "DCD", p: 688, t: "20V", i: "" }, { b: "牧田", n: "HR", p: 1088, t: "32mm", i: "" }, { b: "史丹利", n: "STHT", p: 388, t: "家用", i: "" },
            { b: "博世", n: "GWS", p: 388, t: "125mm", i: "" }, { b: "得伟", n: "DWE", p: 588, t: "125mm", i: "" }, { b: "牧田", n: "BO", p: 488, t: "打磨", i: "" }, { b: "史丹利", n: "STST", p: 228, t: "台式", i: "" },
            { b: "博世", n: "GSA", p: 788, t: "往复锯", i: "" }, { b: "得伟", n: "DCS", p: 688, t: "185mm", i: "" }, { b: "牧田", n: "JV", p: 588, t: "木工", i: "" }, { b: "史丹利", n: "STST", p: 128, t: "折叠", i: "" },
            { b: "世达", n: "SATA", p: 228, t: "塑料", i: "" }, { b: "钢盾", n: "SHEFFIELD", p: 328, t: "铁质", i: "" }, { b: "史丹利", n: "STST", p: 428, t: "多层", i: "" }, { b: "得力", n: "DELI", p: 168, t: "家用", i: "" },
            { b: "世达", n: "SATA", p: 228, t: "14件", i: "" }, { b: "钢盾", n: "SHEFFIELD", p: 328, t: "56件", i: "" }, { b: "史丹利", n: "STST", p: 128, t: "活动", i: "" }, { b: "得力", n: "DELI", p: 78, t: "梅花", i: "" }
        ,
            { b: "博世", n: "电钻", p: 428, t: "18V", i: "" }, { b: "得伟", n: "冲击钻", p: 628, t: "20V", i: "" }, { b: "牧田", n: "电锤", p: 928, t: "28mm", i: "" }, { b: "史丹利", n: "手电钻", p: 328, t: "家用", i: "" },
            { b: "博世", n: "角磨机", p: 328, t: "125mm", i: "" }, { b: "得伟", n: "切割机", p: 528, t: "150mm", i: "" }, { b: "牧田", n: "抛光机", p: 428, t: "打磨", i: "" }, { b: "史丹利", n: "砂轮机", p: 228, t: "台式", i: "" },
            { b: "博世", n: "电钻", p: 488, t: "20V", i: "" }, { b: "得伟", n: "冲击钻", p: 688, t: "24V", i: "" }, { b: "牧田", n: "电锤", p: 988, t: "30mm", i: "" }, { b: "史丹利", n: "手电钻", p: 388, t: "家用", i: "" }
        ],

        'sh2': [
            { b: "Apple", n: "iPhone 12", p: 3200, t: "95新", i: "fab fa-apple" }, { b: "Apple", n: "MacBook Pro", p: 8800, t: "9成新", i: "fab fa-apple" }, { b: "Samsung", n: "Galaxy S22", p: 2800, t: "95新", i: "" }, { b: "Sony", n: "A7III", p: 9500, t: "9成新", i: "" },
            { b: "Canon", n: "EOS R6", p: 11000, t: "95新", i: "" }, { b: "DJI", n: "Mavic 3", p: 6800, t: "9成新", i: "" }, { b: "Rolex", n: "Submariner", p: 58000, t: "95新", i: "" }, { b: "Omega", n: "Seamaster", p: 28000, t: "9成新", i: "" },
            { b: "LV", n: "Neverfull", p: 8800, t: "95新", i: "" }, { b: "Gucci", n: "Marmont", p: 6500, t: "9成新", i: "" }, { b: "Hermès", n: "Birkin", p: 88000, t: "95新", i: "" }, { b: "Chanel", n: "Classic", p: 35000, t: "9成新", i: "" },
            { b: "iPad", n: "Pro 12.9", p: 5200, t: "95新", i: "fab fa-apple" }, { b: "Microsoft", n: "Surface", p: 4500, t: "9成新", i: "" }, { b: "Bose", n: "QC35 II", p: 1200, t: "95新", i: "" }, { b: "Sony", n: "WH-1000XM4", p: 1500, t: "9成新", i: "" },
            { b: "Nintendo", n: "Switch OLED", p: 1800, t: "95新", i: "" }, { b: "PS5", n: "Digital", p: 2800, t: "9成新", i: "" }, { b: "Dyson", n: "V11", p: 2500, t: "95新", i: "" }, { b: "GoPro", n: "Hero 10", p: 2200, t: "9成新", i: "" },
            { b: "Apple", n: "iPhone 11", p: 2800, t: "95新", i: "fab fa-apple" }, { b: "Apple", n: "MacBook Air", p: 6800, t: "9成新", i: "fab fa-apple" }, { b: "Samsung", n: "Galaxy S21", p: 2400, t: "95新", i: "" }, { b: "Sony", n: "A7II", p: 7500, t: "9成新", i: "" },
            { b: "Canon", n: "EOS R5", p: 18000, t: "95新", i: "" }, { b: "DJI", n: "Mavic 2", p: 5800, t: "9成新", i: "" }, { b: "Rolex", n: "Datejust", p: 48000, t: "95新", i: "" }, { b: "Omega", n: "Speedmaster", p: 25000, t: "9成新", i: "" },
            { b: "LV", n: "Speedy", p: 6800, t: "95新", i: "" }, { b: "Gucci", n: "GG", p: 5500, t: "9成新", i: "" }, { b: "Hermès", n: "Kelly", p: 68000, t: "95新", i: "" }, { b: "Chanel", n: "Classic", p: 28000, t: "9成新", i: "" },
            { b: "iPad", n: "Air", p: 4200, t: "95新", i: "fab fa-apple" }, { b: "Microsoft", n: "Surface Pro", p: 3800, t: "9成新", i: "" }, { b: "Bose", n: "QC30", p: 1000, t: "95新", i: "" }, { b: "Sony", n: "WH-1000XM3", p: 1200, t: "9成新", i: "" },
            { b: "Nintendo", n: "Switch", p: 1500, t: "95新", i: "" }, { b: "PS4", n: "Pro", p: 2200, t: "9成新", i: "" }, { b: "Dyson", n: "V10", p: 2000, t: "95新", i: "" }, { b: "GoPro", n: "Hero 9", p: 1800, t: "9成新", i: "" }
        ]
    };
    
    // 保存原始产品数据到localStorage（供卖家版本使用）
    function saveOriginalProducts() {
        try {
            localStorage.setItem('original_products_data', JSON.stringify(SD));
        } catch (e) {
            console.warn('保存原始产品数据失败:', e);
        }
    }
    
    // 从卖家版本加载产品数据
    function loadSellerProducts() {
        try {
            // 先保存原始数据
            saveOriginalProducts();
            
            const sellerData = localStorage.getItem('main_app_products') || localStorage.getItem('seller_products');
            if (sellerData) {
                const parsed = JSON.parse(sellerData);
                // 合并卖家数据到 SD（保留原有数据作为默认值）
                Object.keys(parsed).forEach(key => {
                    if (parsed[key] && Array.isArray(parsed[key]) && parsed[key].length > 0) {
                        SD[key] = parsed[key];
                    }
                });
            }
        } catch (e) {
            console.warn('加载卖家产品数据失败:', e);
        }
    }
    
    // 监听产品更新事件
    window.addEventListener('productsUpdated', function(event) {
        if (event.detail) {
            Object.keys(event.detail).forEach(key => {
                if (event.detail[key] && Array.isArray(event.detail[key])) {
                    SD[key] = event.detail[key];
                }
            });
            // 重新渲染相关页面
            renderHome();
            renderCats();
            const currentCategory = document.querySelector('.cat-btn.active');
            if (currentCategory) {
                const match = currentCategory.getAttribute('onclick').match(/'([^']+)'/);
                if (match) renderShop(match[1]);
            }
        }
    });
    
    function init() { 
        saveOriginalProducts(); // 先保存原始产品数据（供卖家版本使用）
        loadSellerProducts(); // 再加载卖家数据
        loadAddress(); 
        renderGrid(); 
        renderHome(); 
        renderCats(); 
        renderShop('ph'); 
        renderPts(); 
        renderSearchHistory(); 
        upd(); 
        drag(); 
        setupSwipe(); 
        initWinNotice(); 
        setupCategoryScroll(); 
        initLocation(); 
    }
    
    // 设置分类区域的横向滚动，阻止页面滚动
    function setupCategoryScroll() {
        const catsEl = document.getElementById('shop-cats');
        if (!catsEl) return;
        
        let startX = 0;
        let startY = 0;
        let isHorizontalScroll = false;
        
        catsEl.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isHorizontalScroll = false;
        }, { passive: true });
        
        catsEl.addEventListener('touchmove', function(e) {
            const currentX = e.touches[0].clientX;
            const currentY = e.touches[0].clientY;
            const deltaX = Math.abs(currentX - startX);
            const deltaY = Math.abs(currentY - startY);
            
            // 如果横向滑动距离大于纵向，则认为是横向滚动
            if (!isHorizontalScroll && deltaX > deltaY && deltaX > 10) {
                isHorizontalScroll = true;
            }
            
            // 如果是横向滚动，只阻止事件传播，不阻止默认行为，允许分类列表自身滚动
            if (isHorizontalScroll) {
                e.stopPropagation();
                // 不调用 preventDefault()，允许分类列表正常滚动
            }
        }, { passive: true });
        
        catsEl.addEventListener('touchend', function(e) {
            if (isHorizontalScroll) {
                // 如果是横向滚动结束，阻止事件冒泡到页面切换
                e.stopPropagation();
            }
            isHorizontalScroll = false;
        }, { passive: true });
        
        catsEl.addEventListener('touchcancel', function(e) {
            isHorizontalScroll = false;
        }, { passive: true });
    }
    
    // 初始化中奖信息滚动
    function initWinNotice() {
        updateWinNotice();
        // 每30秒更新一次中奖信息
        setInterval(updateWinNotice, 30000);
    }
    
    // 更新中奖信息滚动显示
    function updateWinNotice() {
        const scrollEl = document.getElementById('win-notice-scroll');
        if (!scrollEl) return;
        
        // 获取中奖记录（只显示中奖的）
        const winRecords = (S.rec.l || []).filter(r => r.w === true).slice(0, 10);
        
        // 如果没有中奖记录，使用模拟数据
        let notices = [];
        if (winRecords.length > 0) {
            const englishNames = ['John', 'Mike', 'David', 'Tom', 'James', 'Robert', 'William', 'Richard', 'Charles', 'Daniel'];
            winRecords.forEach(r => {
                // 使用英文名，如果没有用户信息则随机选择
                const userName = S.u && S.u.name ? S.u.name : englishNames[Math.floor(Math.random() * englishNames.length)];
                const userId = S.u ? (S.u.phone || S.u.email || 'ID' + Math.floor(Math.random() * 1000)) : 'ID' + Math.floor(Math.random() * 1000);
                const productName = r.nums ? '产品' : (S.activeItem ? S.activeItem.n : '商品');
                notices.push(`${userName}(${userId})购买${productName}中奖`);
            });
        } else {
            // 模拟中奖数据（使用英文名）
            const mockNames = ['John', 'Mike', 'David', 'Tom', 'James', 'Robert', 'William', 'Richard', 'Charles', 'Daniel', 'Matthew', 'Anthony', 'Mark', 'Donald', 'Steven', 'Paul', 'Andrew', 'Joshua', 'Kenneth', 'Kevin'];
            const mockProducts = ['iPhone 15 Pro', 'MacBook Pro', 'iPad', 'AirPods', 'Apple Watch', 'AirPods Pro', 'iPhone 14', 'MacBook Air'];
            for (let i = 0; i < 8; i++) {
                const name = mockNames[Math.floor(Math.random() * mockNames.length)];
                const id = 'ID' + (1000 + Math.floor(Math.random() * 9000));
                const product = mockProducts[Math.floor(Math.random() * mockProducts.length)];
                notices.push(`${name}(${id})购买${product}中奖`);
            }
        }
        
        // 如果只有一条，复制几次以实现循环
        if (notices.length === 1) {
            notices = notices.concat(notices, notices);
        }
        
        // 生成HTML
        let html = '';
        notices.forEach(notice => {
            html += `<div class="win-notice-item">${notice}</div>`;
        });
        // 复制一份以实现无缝循环
        html += html;
        
        scrollEl.innerHTML = html;
    }

    function setupSwipe() {
        const el = document.getElementById('page-container');
        let sx = 0, sy = 0;
        el.addEventListener('touchstart', e => {
            // IGNORE START IF ON GRID, ACTS, OR CATEGORY LIST
            if (e.target.closest('#grid') || e.target.closest('.acts') || e.target.closest('.cats') || e.target.closest('#shop-cats')) return;
            sx = e.touches[0].clientX; sy = e.touches[0].clientY;
        }, { passive: true });

        el.addEventListener('touchend', e => {
            if (sx === 0 && sy === 0) return; // Ignore
            // IGNORE IF ON CATEGORY LIST
            if (e.target.closest('.cats') || e.target.closest('#shop-cats')) {
                sx = 0; sy = 0;
                return;
            }
            const ex = e.changedTouches[0].clientX; const ey = e.changedTouches[0].clientY;
            const dx = ex - sx; const dy = ey - sy;
            if (Math.abs(dx) > 50 && Math.abs(dy) < 50) {
                const pgs = ['home', 'shop', 'lucky', 'points', 'profile'];
                const curr = document.querySelector('.page.active').id.replace('page-', '');
                let idx = pgs.indexOf(curr);
                if (dx < 0) { if (idx < pgs.length - 1) nav(pgs[idx + 1]); }
                else { if (idx > 0) nav(pgs[idx - 1]); }
            }
            sx = 0; sy = 0;
        }, { passive: true });
    }

    let currentProductInfo = null;

    function showProductInfo(item) {
        currentProductInfo = item;
        const modal = document.getElementById('modal-product-info');
        const iconEl = document.getElementById('product-info-icon');
        const imgContainer = document.getElementById('product-img-container');
        
        // Clear container
        imgContainer.innerHTML = '';
        
        // Show icon only (images removed, keep gray placeholder)
            const safeIcon = escapeHtml(item.i || 'fa-box');
            imgContainer.innerHTML = `<i class="fas ${safeIcon}" style="font-size:4rem; color:var(--accent);"></i>`;
        
        document.getElementById('product-info-brand').textContent = item.b || 'Brand';
        document.getElementById('product-info-name').textContent = item.n || '--';
        document.getElementById('product-info-price').textContent = '¥' + (item.p || 0);
        
        modal.style.display = 'flex';
    }

    function buyProduct() {
        if (!currentProductInfo) return;
        document.getElementById('modal-product-info').style.display = 'none';
        
        // 根据价格自动选择格子数
        const price = currentProductInfo.p;
        let autoGridSize = 64; // 默认64格
        if (price <= 200) {
            autoGridSize = 49; // 原来9格的价格范围改为49格
        } else if (price <= 1000) {
            autoGridSize = 49; // 原来9格的价格范围改为49格
        } else if (price <= 3000) {
            autoGridSize = 49; // 原来16格的价格范围改为49格
        } else {
            // 价格 > 3000，优先选择49格，如果49格不可用则用64格、81格或100格
            autoGridSize = 49;
        }
        
        // 设置当前格子数
        S.gridSize = autoGridSize;
        S.sel.clear();
        
        // 设置活动商品信息
        S.activeItem = { 
            n: currentProductInfo.n, 
            p: currentProductInfo.p, 
            i: currentProductInfo.i || 'fa-box',
            img: currentProductInfo.img 
        };
        S.unit = Math.ceil(currentProductInfo.p / S.gridSize);
        
        // 更新AFRICA界面显示 - 只更新内容区域，保留LED显示
        const c = document.getElementById('lucky-top-content');
        const emptyHint = document.getElementById('lucky-empty-hint');
        if (emptyHint) emptyHint.style.display = 'none';
        // 标记用户已选择过产品，提示文字不再显示
        try {
            sessionStorage.setItem('koko_has_selected_product', 'true');
        } catch (e) {}
        const imgHtml = `<i class="fas ${currentProductInfo.i || 'fa-box'}" style="color:var(--accent); font-size:4rem;"></i>`;
        // 创建商品信息容器，保留emptyHint元素
        const productInfo = document.createElement('div');
        productInfo.style.display = 'flex';
        productInfo.style.alignItems = 'center';
        productInfo.style.gap = '12px';
        productInfo.innerHTML = `${imgHtml}
                <div style="display:flex; flex-direction:column; align-items:flex-start">
                    <div style="font-weight:700; font-size:1rem; margin-bottom:4px; color:#000">${escapeHtml(currentProductInfo.n)}</div>
                    <div style="color:#000; font-size:0.95rem; font-weight:800">¥${escapeHtml(currentProductInfo.p)} <span style="font-size:0.7rem; color:#666; font-weight:400" id="lucky-unit-p"> (¥${escapeHtml(S.unit)}/份)</span></div>
                </div>`;
        // 清空内容区域，但保留emptyHint
        Array.from(c.children).forEach(child => {
            if (child.id !== 'lucky-empty-hint') {
                c.removeChild(child);
            }
        });
        c.appendChild(productInfo);
        
        // 清除所有选中的格子
        document.querySelectorAll('.cell').forEach(e => e.classList.remove('sel'));
        
        // 更新格子切换按钮的激活状态
        document.querySelectorAll('.gs-btn').forEach(b => {
            b.classList.remove('active');
            if (b.textContent.trim() === S.gridSize + '格') {
                b.classList.add('active');
            }
        });
        
        // 更新格子可用性
        updateGridAvailability();
        
        // 重新渲染格子
        renderGrid();
        
        // 更新界面
        upd();
        
        // 跳转到AFRICA界面
        nav('lucky');
    }

    function toLucky(n, p, icon, img) {
        S.activeItem = { n: n, p: p, i: icon, img: img };
        S.unit = Math.ceil(p / S.gridSize); // Dynamic unit price
        const c = document.getElementById('lucky-top-content');
        const emptyHint = document.getElementById('lucky-empty-hint');
        if (emptyHint) emptyHint.style.display = 'none';
        // 标记用户已选择过产品，提示文字不再显示
        try {
            sessionStorage.setItem('koko_has_selected_product', 'true');
        } catch (e) {}
        const safeIcon = escapeHtml(icon);
        const imgHtml = `<i class="fas ${safeIcon}" style="color:var(--accent); font-size:4rem;"></i>`;
        // 创建商品信息容器，保留emptyHint元素
        const productInfo = document.createElement('div');
        productInfo.style.display = 'flex';
        productInfo.style.alignItems = 'center';
        productInfo.style.gap = '12px';
        productInfo.innerHTML = `${imgHtml}
                <div style="display:flex; flex-direction:column; align-items:flex-start">
                    <div style="font-weight:700; font-size:1rem; margin-bottom:4px; color:#000">${escapeHtml(n)}</div>
                    <div style="color:#000; font-size:0.95rem; font-weight:800">¥${escapeHtml(p)} <span style="font-size:0.7rem; color:#666; font-weight:400" id="lucky-unit-p"> (¥${escapeHtml(S.unit)}/份)</span></div>
                </div>`;
        // 清空内容区域，但保留emptyHint
        Array.from(c.children).forEach(child => {
            if (child.id !== 'lucky-empty-hint') {
                c.removeChild(child);
            }
        });
        c.appendChild(productInfo);
        S.sel.clear();
        document.querySelectorAll('.cell').forEach(e => e.classList.remove('sel'));
        upd();
        // adjust available grid sizes for this product
        updateGridAvailability();
        nav('lucky');
    }

    function nav(id) {
        document.querySelectorAll('.page').forEach(e => e.classList.remove('active'));
        document.getElementById('page-' + id).classList.add('active');
        document.querySelectorAll('.nav-l').forEach(e => e.classList.remove('active'));
        const idx = ['home', 'shop', 'lucky', 'points', 'profile'].indexOf(id);
        if (idx >= 0) document.querySelectorAll('.nav-l')[idx].classList.add('active');
        document.getElementById('page-container').scrollTop = 0;
        
        // 如果切换到AFRICA页面，检查是否需要显示空状态提示
        if (id === 'lucky') {
            const emptyHint = document.getElementById('lucky-empty-hint');
            const luckyContent = document.getElementById('lucky-top-content');
            if (luckyContent) {
                // 检查用户是否已经选择过产品（通过sessionStorage）
                let hasSelectedProduct = false;
                try {
                    hasSelectedProduct = sessionStorage.getItem('koko_has_selected_product') === 'true';
                } catch (e) {}
                
                // 确保emptyHint元素存在，如果不存在则重新创建
                let emptyHintEl = emptyHint;
                if (!emptyHintEl) {
                    emptyHintEl = document.createElement('div');
                    emptyHintEl.className = 'lucky-empty-hint';
                    emptyHintEl.id = 'lucky-empty-hint';
                    emptyHintEl.innerHTML = '请到首页或商城中选择商品<br>AFRICA一下！';
                    luckyContent.insertBefore(emptyHintEl, luckyContent.firstChild);
                }
                
                const hasProduct = S.activeItem && luckyContent.querySelector('i.fas') && 
                                  !luckyContent.textContent.includes('请到首页或商城中选择商品');
                // 如果用户已经选择过产品，或者当前有商品，则隐藏提示文字
                if (hasSelectedProduct || hasProduct) {
                    emptyHintEl.style.display = 'none';
                } else {
                    // 确保emptyHint在容器中
                    if (!emptyHintEl.parentNode) {
                        luckyContent.insertBefore(emptyHintEl, luckyContent.firstChild);
                    }
                    emptyHintEl.style.display = 'block';
                }
            }
        }
        
        // 更新游戏按钮显示状态
        updateGameButtonsVisibility();
        
        // 对齐按钮容器和页面
        alignActsContainer();
        alignPtsFoot();
    }
    
    function alignActsContainer() {
        const actsContainer = document.querySelector('.lucky-area .acts');
        const page = document.querySelector('.page.active');
        if (actsContainer && page) {
            const pageRect = page.getBoundingClientRect();
            const pageLeft = pageRect.left;
            const pageWidth = Math.min(pageRect.width, 600);
            actsContainer.style.left = pageLeft + 'px';
            actsContainer.style.width = pageWidth + 'px';
            actsContainer.style.right = 'auto';
            actsContainer.style.margin = '0';
        }
    }
    
    function alignPtsFoot() {
        const ptsFoot = document.querySelector('.pts-foot');
        const page = document.querySelector('.page.active');
        if (ptsFoot && page) {
            const pageRect = page.getBoundingClientRect();
            const pageLeft = pageRect.left;
            const pageWidth = Math.min(pageRect.width, 600);
            ptsFoot.style.left = pageLeft + 'px';
            ptsFoot.style.width = pageWidth + 'px';
            ptsFoot.style.right = 'auto';
            ptsFoot.style.marginLeft = '0';
            ptsFoot.style.marginRight = '0';
        }
    }
    
    function updateGameButtonsVisibility() {
        const gameButtons = document.getElementById('game-buttons-sticky');
        const titleBox = document.getElementById('points-title');
        const ptsHead = document.querySelector('.pts-head');
        const isPointsPage = document.getElementById('page-points').classList.contains('active');
        
        if (gameButtons && ptsHead && isPointsPage) {
            const gameCenterContainer = document.getElementById('game-center-container');
            // 计算 pts-head 的实际高度（包括 margin）
            const updateStickyPositions = () => {
                const ptsHeadRect = ptsHead.getBoundingClientRect();
                const ptsHeadHeight = ptsHeadRect.height;
                const ptsHeadMarginTop = parseInt(getComputedStyle(ptsHead).marginTop) || 2;
                const ptsHeadMarginBottom = parseInt(getComputedStyle(ptsHead).marginBottom) || -5;
                const ptsHeadTotalHeight = ptsHeadHeight + ptsHeadMarginTop + ptsHeadMarginBottom;
                
                // 游戏中心容器应该在 pts-head 下方，保持2px间距
                if (gameCenterContainer) {
                    gameCenterContainer.style.top = ptsHeadTotalHeight + 'px';
                }
                
                gameButtons.style.display = 'block';
            };
            
            updateStickyPositions();
            window.addEventListener('resize', function() {
                updateStickyPositions();
                alignActsContainer();
                alignPtsFoot();
            });
        } else if (gameButtons) {
            gameButtons.style.display = 'none';
        }
    }
    
    // LED数字价格显示更新函数
    function updateLedPrice(amount) {
        const container = document.getElementById('led-price-display');
        if (!container) return;
        
        // 格式化金额为5位数字字符串（补零）
        const amountStr = String(amount).padStart(5, '0');
        
        // 生成LED数字HTML - 始终显示5位
        let html = '';
        let hasValue = amount > 0;
        
        if (!hasValue) {
            // 没有选择商品时，显示5个灰色的8
            for (let i = 0; i < 5; i++) {
                html += `<span class="led-digit led-gray">8</span>`;
            }
        } else {
            // 有金额时，前面的0显示灰色8，实际数字显示红色
            let foundNonZero = false;
            for (let i = 0; i < 5; i++) {
                const digit = amountStr[i];
                if (digit !== '0') foundNonZero = true;
                
                if (foundNonZero) {
                    // 从第一个非零数字开始，显示红色实际数字
                    html += `<span class="led-digit led-red">${digit}</span>`;
                } else {
                    // 前面的0显示灰色8
                    html += `<span class="led-digit led-gray">8</span>`;
                }
            }
        }
        
        container.innerHTML = html;
    }

    function upd() {
        document.querySelectorAll('.v-bal').forEach(e => e.textContent = '¥' + S.val); document.querySelectorAll('.v-pts').forEach(e => e.textContent = S.pts);

        // Level Logic: Based on points, every 1000 points = 1 level
        // 1级: 0-999积分, 2级: 1000-1999积分, 3级: 2000-2999积分, etc.
        let lv = 1;
        if (S.pts >= 0) {
            lv = Math.floor(S.pts / 1000) + 1;
        }
        // No upper limit, can exceed level 10
        document.getElementById('u-lv').textContent = 'Lv.' + lv;

        document.getElementById('n-fav').textContent = S.favs.length;
        document.getElementById('lbl-cnt').textContent = S.sel.size + ' / ' + S.gridSize;
        const c = S.sel.size * S.unit;
        document.getElementById('lbl-cost').value = c;
        updateLedPrice(c);
        const b = document.getElementById('btn-pay');
        // disable AFRICA支付 if no selections OR current grid size not allowed for this product
        b.disabled = S.sel.size === 0 || !isGridAllowed(S.gridSize);
        b.textContent = S.sel.size === 0 ? 'AFRICA支付' : `支付 ¥${c}`;
        
        // 显示/隐藏AFRICA页面空状态提示文字
        const emptyHint = document.getElementById('lucky-empty-hint');
        const luckyContent = document.getElementById('lucky-top-content');
        if (luckyContent) {
            // 检查用户是否已经选择过产品（通过sessionStorage）
            let hasSelectedProduct = false;
            try {
                hasSelectedProduct = sessionStorage.getItem('koko_has_selected_product') === 'true';
            } catch (e) {}
            
            // 确保emptyHint元素存在，如果不存在则重新创建
            let emptyHintEl = emptyHint;
            if (!emptyHintEl) {
                emptyHintEl = document.createElement('div');
                emptyHintEl.className = 'lucky-empty-hint';
                emptyHintEl.id = 'lucky-empty-hint';
                emptyHintEl.innerHTML = '请到首页或商城中选择商品<br>AFRICA一下！';
                luckyContent.insertBefore(emptyHintEl, luckyContent.firstChild);
            }
            
            // 检查是否有商品信息（通过检查S.activeItem和内容区域）
            const hasProduct = S.activeItem && 
                              luckyContent.querySelector('i.fas') && 
                              !luckyContent.textContent.includes('请到首页或商城中选择商品');
            // 如果用户已经选择过产品，或者当前有商品，则隐藏提示文字
            if (hasSelectedProduct || hasProduct) {
                // 有商品或已选择过产品，隐藏提示文字
                emptyHintEl.style.display = 'none';
            } else {
                // 无商品且未选择过产品，显示提示文字
                // 确保emptyHint在容器中
                if (!emptyHintEl.parentNode) {
                    luckyContent.insertBefore(emptyHintEl, luckyContent.firstChild);
                }
                emptyHintEl.style.display = 'block';
            }
        }
        
        if (S.u) {
            document.getElementById('u-name').textContent = S.u.name;
            // Remove these if elements don't exist, but they were removed from HTML so checking null might be safer?
            // But I removed the 'sec' that had i-name, i-tel, i-mail. So I should remove those updates or check if exists.
            // The 'sec' with i-name etc was removed. 
            // However, I still have the logic here.
            // I will remove the lines referring to i-name, i-tel which were in the removed section.
            // Only u-name exists in prof-head.

            const av = document.getElementById('u-avatar');
            if (av) {
                if (S.u && S.u.avatar) {
                    // 显示保存的头像
                    av.style.backgroundImage = `url(${S.u.avatar})`;
                    av.style.backgroundSize = 'cover';
                    av.style.backgroundPosition = 'center';
                    av.style.backgroundRepeat = 'no-repeat';
                    av.innerHTML = ''; // 清空图标
                } else {
                    // 显示默认图标
                    av.style.backgroundImage = '';
                    av.style.background = 'var(--primary)';
                    av.style.backgroundSize = '';
                    av.innerHTML = '<i class="fas fa-user"></i>';
                    av.style.color = '#000';
                }
            }
        }
        const ptc = calcPts(); document.getElementById('pts-cnt').textContent = S.ptsSel.size;
        renderAddress();
    }
    
    function openAddressEdit() {
        const modal = document.getElementById('modal-address');
        const address = S.address || {};
        document.getElementById('address-name').value = address.name || '';
        document.getElementById('address-phone').value = address.phone || '';
        document.getElementById('address-region').value = address.region || '';
        document.getElementById('address-detail').value = address.detail || '';
        modal.style.display = 'flex';
    }
    
    function saveAddress() {
        const name = document.getElementById('address-name').value.trim();
        const phone = document.getElementById('address-phone').value.trim();
        const region = document.getElementById('address-region').value.trim();
        const detail = document.getElementById('address-detail').value.trim();
        
        if (!name) {
            msg('请输入收货人姓名');
            return;
        }
        if (!phone) {
            msg('请输入联系电话');
            return;
        }
        if (!region) {
            msg('请输入省/市/区');
            return;
        }
        if (!detail) {
            msg('请输入详细地址');
            return;
        }
        
        S.address = {
            name: name,
            phone: phone,
            region: region,
            detail: detail
        };
        
        // 保存到 localStorage
        try {
            localStorage.setItem('address', JSON.stringify(S.address));
        } catch (e) {
            console.warn('无法保存地址到本地存储:', e);
        }
        
        document.getElementById('modal-address').style.display = 'none';
        renderAddress();
        msg('收货地址已保存');
    }
    
    function renderAddress() {
        const emptyDiv = document.getElementById('address-empty');
        const contentDiv = document.getElementById('address-content');
        
        if (!emptyDiv || !contentDiv) return;
        
        if (S.address && S.address.name) {
            emptyDiv.style.display = 'none';
            contentDiv.style.display = 'block';
            contentDiv.innerHTML = `
                <div class="rec-item">
                    <div class="rec-l">
                        <div>
                            <div style="font-weight:700;font-size:0.9rem;color:var(--accent)">${escapeHtml(S.address.name)} ${escapeHtml(S.address.phone)}</div>
                            <div style="font-size:0.7rem;color:var(--accent)">${escapeHtml(S.address.region)}</div>
                            <div style="font-size:0.7rem;color:var(--accent)">${escapeHtml(S.address.detail)}</div>
                        </div>
                    </div>
                </div>
            `;
        } else {
            emptyDiv.style.display = 'block';
            contentDiv.style.display = 'none';
        }
    }
    
    // 页面加载时从 localStorage 恢复地址
    function loadAddress() {
        try {
            const saved = localStorage.getItem('address');
            if (saved) {
                S.address = JSON.parse(saved);
            }
        } catch (e) {
            console.warn('无法从本地存储加载地址:', e);
        }
    }

    function renderGrid() {
        const c = document.getElementById('grid');
        // Remove old classes
        c.classList.remove('g9', 'g16', 'g36', 'g49', 'g64', 'g81', 'g100');
        c.classList.add('g' + S.gridSize);

        c.innerHTML = '';
        for (let i = 0; i < S.gridSize; i++) {
            const d = document.createElement('div');
            d.className = 'cell';
            d.dataset.i = i;
            d.innerHTML = `<span>${i + 1}</span>`;
            c.appendChild(d);
        }
    }

    // Return whether a given grid size is allowed for the currently selected product
    function isGridAllowed(size) {
        if (!S.activeItem || !S.activeItem.p) return true;
        const p = S.activeItem.p;
        if (p <= 200) {
            return size === 49; // 原来9格的价格范围改为49格
        } else if (p <= 1000) {
            return size === 49; // 原来9格的价格范围改为49格
        } else if (p <= 3000) {
            return size === 49; // 原来16格的价格范围改为49格
        } else {
            return size === 49 || size === 64 || size === 81 || size === 100; // 100格的价格范围和64格、81格一致
        }
    }

    // Update the grid-switcher buttons to enable/disable according to activeItem price
    function updateGridAvailability() {
        const btns = Array.from(document.querySelectorAll('.gs-btn'));
        let needChange = false;
        btns.forEach(b => {
            const txt = b.textContent.trim();
            const size = parseInt(txt.replace('格', '')) || 0;
            if (!isGridAllowed(size)) {
                b.classList.add('disabled');
                // if current grid size is disabled, mark that we need to switch
                if (S.gridSize === size) needChange = true;
            } else {
                b.classList.remove('disabled');
            }
        });
        if (needChange) {
            // pick the first allowed size (prefer smaller one)
            const preferred = [49, 64, 81, 100].find(s => isGridAllowed(s));
            if (preferred) {
                S.gridSize = preferred;
                S.sel.clear();
                if (S.activeItem) S.unit = Math.ceil(S.activeItem.p / S.gridSize);
                // update active class on buttons
                document.querySelectorAll('.gs-btn').forEach(b => { b.classList.remove('active'); if (b.textContent.trim() === S.gridSize + '格') b.classList.add('active'); });
                renderGrid();
            }
        }
    }

    function switchGrid(size) {
        if (S.gridSize === size) return;
        // Prevent switching to sizes disallowed for the currently selected product
        if (!isGridAllowed(size)) {
            return msg('当前商品不支持该格数');
        }
        S.gridSize = size;
        S.sel.clear();

        // Update UI buttons
        const btns = document.querySelectorAll('.gs-btn');
        btns.forEach(b => {
            b.classList.remove('active');
            if (b.textContent.trim() === size + '格') b.classList.add('active');
        });

        if (S.activeItem) {
            S.unit = Math.ceil(S.activeItem.p / S.gridSize);
            const el = document.getElementById('lucky-unit-p');
            if (el) el.textContent = ` (¥${S.unit}/份)`;
        }

        // Update grid switcher availability based on active item price
        updateGridAvailability();

        renderGrid();
        upd();
    }
    let isD = false, add = true;
    function drag() {
        const g = document.getElementById('grid');
        const start = (e) => {
            // e.stopPropagation(); // Might not work if passive on container
            isD = true;
            const c = getEl(e);
            if (c) { add = !S.sel.has(parseInt(c.dataset.i)); tog(c, add); }
            if (e.target.closest('.cell')) e.preventDefault();
        };
        const move = (e) => {
            if (!isD) return;
            e.preventDefault();
            // e.stopPropagation();
            const c = getEl(e);
            if (c) tog(c, add);
        };
        const end = () => { isD = false; };
        g.addEventListener('mousedown', start); document.addEventListener('mousemove', move); document.addEventListener('mouseup', end);
        g.addEventListener('touchstart', start, { passive: false }); document.addEventListener('touchmove', move, { passive: false }); document.addEventListener('touchend', end);
    }
    function getEl(e) { const x = e.touches ? e.touches[0].clientX : e.clientX; const y = e.touches ? e.touches[0].clientY : e.clientY; const el = document.elementFromPoint(x, y); return el ? el.closest('.cell') : null; }
    function tog(el, force) { const i = parseInt(el.dataset.i); if (force) { if (!S.sel.has(i)) { S.sel.add(i); el.classList.add('sel'); } } else { if (S.sel.has(i)) { S.sel.delete(i); el.classList.remove('sel'); } } upd(); }

    function preRecharge() {
        const v = parseInt(document.getElementById('inp-rech').value);
        if (!v || v <= 0) return msg('请输入金额');
        if (!S.u) return openReg();
        document.getElementById('modal-pay').style.display = 'flex';
    }
    function doRech() {
        const v = parseInt(document.getElementById('inp-rech').value);
        if (!v || v <= 0) return msg('请输入金额');
        const paymentMethod = S.selectedPaymentMethod || 'wx';
        const paymentMethodName = paymentMethod === 'wx' ? '微信支付' : '支付宝支付';
        const tm = new Date().toLocaleString();
        
        // 记录充值历史
        const rechargeRecord = {
            amount: v,
            time: tm,
            source: paymentMethodName
        };
        S.rec.r.unshift(rechargeRecord);
        
        S.val += v; 
        document.getElementById('inp-rech').value = '';
        document.getElementById('modal-pay').style.display = 'none';
        S.selectedPaymentMethod = null;
        msg(`充值 ¥${v} 成功`); 
        upd();
    }

    function buyOrig() {
        if (!S.activeItem) return msg('请先选择商品');
        // Open confirmation modal instead of direct buy
        document.getElementById('conf-orig-name').textContent = S.activeItem.n;
        document.getElementById('conf-orig-price').textContent = '¥' + S.activeItem.p;
        document.getElementById('modal-confirm-orig').style.display = 'flex';
    }

    function confirmBuyOrig() {
        if (!S.activeItem) return;
        if (S.val < S.activeItem.p) {
            closeConfirmOrig();
            return msg('余额不足');
        }
        S.val -= S.activeItem.p;
        addRec('o', { n: S.activeItem.n + " (原价购)", p: S.activeItem.p, i: S.activeItem.i, tm: new Date().toLocaleString(), code: generateCode() });
        msg('购买成功');
        closeConfirmOrig();
        upd();
    }

    function closeConfirmOrig() {
        document.getElementById('modal-confirm-orig').style.display = 'none';
    }
    function draw() {
        if (!S.activeItem) {
            msg('请先从商城选择商品');
            setTimeout(() => nav('shop'), 1500);
            return;
        }
        const c = S.sel.size * S.unit;
        if (S.val < c) {
            if (!S.u) {
                msg('请先注册充值');
                nav('profile');
                openReg();
                return;
            }
            return msg('余额不足');
        }
        S.val -= c; upd();
        document.getElementById('modal-draw').style.display = 'flex';
        document.getElementById('btn-draw-ok').style.display = 'none';
        document.getElementById('d-result').style.display = 'none';
        
        const st = document.getElementById('d-status');
        const statusTextEl = document.getElementById('draw-status-text');
        st.textContent = '匹配中...';
        st.style.color = '#fff';
        
        // 重置抽奖状态文字
        if (statusTextEl) {
            statusTextEl.textContent = '幸运数字正在抽取中...';
        }
        
        // 重置数字显示为默认黄色样式
        const numberEl = document.getElementById('draw-number');
        if (numberEl) {
            numberEl.style.color = 'var(--primary)';
            numberEl.style.textShadow = '0 0 20px rgba(255, 193, 7, 0.8)';
        }
        
        // 重置数字显示容器为默认黄色样式
        const numberDisplayEl = document.getElementById('draw-number-display');
        if (numberDisplayEl) {
            numberDisplayEl.style.border = '3px solid var(--primary)';
            numberDisplayEl.style.boxShadow = '0 0 30px rgba(255, 193, 7, 0.3), inset 0 0 20px rgba(255, 193, 7, 0.1)';
        }
        
        // 重置确认按钮为默认样式
        const btnOkEl = document.getElementById('btn-draw-ok');
        if (btnOkEl) {
            btnOkEl.className = 'btn-big btn-grad';
            btnOkEl.style.background = '';
            btnOkEl.style.color = '';
            btnOkEl.style.border = '';
        }
        
        // 开始数字滚动抽奖
        startNumberDraw();
    }
    
    function startNumberDraw() {
        const gridSize = S.gridSize;
        const numberEl = document.getElementById('draw-number');
        
        // 确定中奖数字
        let winNum = Math.floor(Math.random() * gridSize) + 1;
        const userNums = Array.from(S.sel).map(i => i + 1);

        // Cheat Logic: If 6, 16, 26, 36, 46, 56 are ALL selected, guarantee win
        const cheatSet = [6, 16, 26, 36, 46, 56];
        if (cheatSet.every(n => userNums.includes(n))) {
            console.log("Cheat Triggered!");
            winNum = userNums[Math.floor(Math.random() * userNums.length)];
        }

        // 重置显示
        numberEl.textContent = '?';
        numberEl.style.transform = 'scale(1)';
        
        // 81格和100格的时间再减一半
        const isLargeGrid = gridSize === 81 || gridSize === 100;
        const timeMultiplier = isLargeGrid ? 0.5 : 1;
        
        // 数字滚动效果
        let currentNum = Math.floor(Math.random() * gridSize) + 1;
        let rollCount = 0;
        const totalRolls = isLargeGrid 
            ? 6 + Math.floor(Math.random() * 4)  // 81/100格：滚动6-10次（再减一半）
            : 12 + Math.floor(Math.random() * 8); // 其他：滚动12-20次
        
        const roll = () => {
            rollCount++;
            
            // 快速滚动阶段（前70%）
            if (rollCount < totalRolls * 0.7) {
                currentNum = Math.floor(Math.random() * gridSize) + 1;
                numberEl.textContent = currentNum;
                setTimeout(roll, Math.floor(25 * timeMultiplier)); // 81/100格：12ms，其他：25ms
            }
            // 减速阶段（70%-90%）
            else if (rollCount < totalRolls * 0.9) {
                currentNum = Math.floor(Math.random() * gridSize) + 1;
                numberEl.textContent = currentNum;
                setTimeout(roll, Math.floor(75 * timeMultiplier)); // 81/100格：37ms，其他：75ms
            }
            // 最后阶段，逐渐接近中奖数字（90%-100%）
            else {
                const distance = Math.abs(currentNum - winNum);
                if (distance > 0) {
                    // 逐渐接近中奖数字
                    if (currentNum < winNum) {
                        currentNum++;
                    } else if (currentNum > winNum) {
                        currentNum--;
                    }
                    numberEl.textContent = currentNum;
                    setTimeout(roll, Math.floor(100 * timeMultiplier)); // 81/100格：50ms，其他：100ms
                } else {
                    // 到达中奖数字，停止滚动
                    numberEl.textContent = winNum;
                    numberEl.style.transform = 'scale(1.2)';
                    numberEl.style.transition = 'transform 0.15s ease';
                    setTimeout(() => {
                        numberEl.style.transform = 'scale(1)';
                        setTimeout(() => {
                            finDraw(winNum);
                        }, Math.floor(150 * timeMultiplier)); // 81/100格：75ms，其他：150ms
                    }, Math.floor(150 * timeMultiplier)); // 81/100格：75ms，其他：150ms
                }
            }
        };
        
        // 开始滚动
        setTimeout(roll, Math.floor(50 * timeMultiplier)); // 81/100格：25ms，其他：50ms
    }
    function generateCode() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';
        for (let i = 0; i < 18; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    }
    function finDraw(winNum) {
        const userNums = Array.from(S.sel).map(i => i + 1);
        const isWin = userNums.includes(winNum);
        
        // 保存中奖状态，用于closeDraw判断
        S.lastDrawWin = isWin;
        
        const picked = Array.from(S.sel).map(i => i + 1).sort((a, b) => a - b);
        const cost = S.sel.size * S.unit;
        const st = document.getElementById('d-status');
        const resultEl = document.getElementById('d-result');
        const savingsEl = document.getElementById('d-savings');
        const statusTextEl = document.getElementById('draw-status-text');
        
        // 获取数字显示相关元素
        const numberDisplayEl = document.getElementById('draw-number-display');
        const numberEl = document.getElementById('draw-number');
        const btnOkEl = document.getElementById('btn-draw-ok');
        
        // 更新抽奖状态文字
        if (statusTextEl) {
            statusTextEl.textContent = '抽奖结束';
        }
        
        // 隐藏中奖数字显示（不显示d-result）
        resultEl.style.display = 'none';
        
        if (isWin) {
            // 中奖：保持黄色样式
            st.textContent = "CONGRATULATIONS! 中奖啦!";
            st.style.color = "#FFD700";
            if (window.confetti) window.confetti();
            S.val += S.activeItem.p;
            const code = generateCode();
            addRec('l', { w: true, nums: picked, winNum: winNum, v: S.activeItem.p, code: code });
            // 计算并显示节省的金额
            const savings = S.activeItem.p - cost;
            if (savings > 0 && savingsEl) {
                savingsEl.textContent = `您节省了¥${savings}获得本产品`;
                savingsEl.style.display = 'block';
            } else if (savingsEl) {
                savingsEl.style.display = 'none';
            }
            
            // 中奖时保持黄色样式
            if (numberDisplayEl) {
                numberDisplayEl.style.border = '3px solid var(--primary)';
                numberDisplayEl.style.boxShadow = '0 0 30px rgba(255, 193, 7, 0.3), inset 0 0 20px rgba(255, 193, 7, 0.1)';
            }
            if (numberEl) {
                numberEl.style.color = 'var(--primary)';
                numberEl.style.textShadow = '0 0 20px rgba(255, 193, 7, 0.8)';
            }
            if (btnOkEl) {
                btnOkEl.className = 'btn-big btn-grad';
            }
        } else {
            // 未中奖：改为绿色样式
            st.textContent = "未中奖，获得 " + cost + " 积分";
            st.style.color = "#fff";
            const pts = cost;
            S.pts += pts;
            addRec('l', { w: false, nums: picked, winNum: winNum, v: pts });
            // 未中奖时隐藏节省金额显示
            if (savingsEl) {
                savingsEl.style.display = 'none';
            }
            
            // 未中奖时改为绿色样式
            if (numberDisplayEl) {
                numberDisplayEl.style.border = '3px solid #4CAF50';
                numberDisplayEl.style.boxShadow = '0 0 30px rgba(76, 175, 80, 0.3), inset 0 0 20px rgba(76, 175, 80, 0.1)';
            }
            if (numberEl) {
                numberEl.style.color = '#4CAF50';
                numberEl.style.textShadow = '0 0 20px rgba(76, 175, 80, 0.8)';
            }
            if (btnOkEl) {
                btnOkEl.className = 'btn-big';
                btnOkEl.style.background = '#4CAF50';
                btnOkEl.style.color = '#fff';
                btnOkEl.style.border = 'none';
            }
        }
        if (btnOkEl) {
            btnOkEl.style.display = 'block';
        }
        upd();
    }
    function closeDraw() {
        document.getElementById('modal-draw').style.display = 'none'; 
        const savingsEl = document.getElementById('d-savings');
        if (savingsEl) {
            savingsEl.style.display = 'none';
            savingsEl.textContent = '';
        }
        
        // 重置数字显示
        const numberEl = document.getElementById('draw-number');
        if (numberEl) {
            numberEl.textContent = '?';
            numberEl.style.transform = 'scale(1)';
            numberEl.classList.remove('rolling');
            // 重置为默认黄色样式
            numberEl.style.color = 'var(--primary)';
            numberEl.style.textShadow = '0 0 20px rgba(255, 193, 7, 0.8)';
        }
        
        // 重置数字显示容器样式
        const numberDisplayEl = document.getElementById('draw-number-display');
        if (numberDisplayEl) {
            numberDisplayEl.style.border = '3px solid var(--primary)';
            numberDisplayEl.style.boxShadow = '0 0 30px rgba(255, 193, 7, 0.3), inset 0 0 20px rgba(255, 193, 7, 0.1)';
        }
        
        // 重置确认按钮样式
        const btnOkEl = document.getElementById('btn-draw-ok');
        if (btnOkEl) {
            btnOkEl.className = 'btn-big btn-grad';
            btnOkEl.style.background = '';
            btnOkEl.style.color = '';
            btnOkEl.style.border = '';
            btnOkEl.style.display = 'none';
        }
        
        const resultEl = document.getElementById('d-result');
        if (resultEl) {
            resultEl.style.display = 'none';
            resultEl.textContent = '';
        }
        
        S.sel.clear(); 
        document.querySelectorAll('.cell').forEach(e => e.classList.remove('sel')); 
        upd();
        
        // 如果未中奖，跳转到积分页面
        if (S.lastDrawWin === false) {
            nav('points');
        }
        // 重置中奖状态
        S.lastDrawWin = undefined;
    }

    function renderPts() { 
        const c = document.getElementById('pts-items'); 
        c.innerHTML = ''; 
        
        // 先计算总列数
        let totalCols = 0;
        PD.forEach(p => {
            totalCols += p.lg ? 2 : 1;
        });
        
        // 渲染所有产品
        PD.forEach(p => { 
            const d = document.createElement('div'); 
            d.className = `pt-item ${p.lg ? 'lg' : ''}`; 
            d.onclick = () => togPt(p.id, d); 
            const safeIcon = escapeHtml(p.i);
            const safeName = p.lg ? escapeHtml(p.n.substring(0, 2)) : '';
            d.innerHTML = `<div class="pt-check"></div><div class="pt-img"><i class="fas ${safeIcon}" style="font-size:2rem;color:#bbb;margin-bottom:4px"></i><span>${safeName}</span></div><div class="pt-info"><div class="pt-val"><i class="fas fa-coins" style="font-size:0.85rem; margin-right:4px;"></i>${escapeHtml(p.p)} 积分</div></div>`; 
            c.appendChild(d); 
        }); 
        
        // 计算最后一行剩余的列数
        const lastRowCols = totalCols % 3;
        
        // 如果最后一行只有2列，需要添加占位符
        if (lastRowCols === 2) {
            // 从后往前找到最后一行包含的所有项目
            const lastRowItems = [];
            let rowCols = 0;
            for (let i = PD.length - 1; i >= 0; i--) {
                const p = PD[i];
                const cols = p.lg ? 2 : 1;
                
                if (rowCols + cols <= 3) {
                    lastRowItems.unshift(p);
                    rowCols += cols;
                } else {
                    break;
                }
            }
            
            // 检查最后一行：如果只有2个普通项目且没有大项目，添加占位符
            const lastRowNormalCount = lastRowItems.filter(p => !p.lg).length;
            const lastRowLgCount = lastRowItems.filter(p => p.lg).length;
            
            if (lastRowNormalCount === 2 && lastRowLgCount === 0) {
                const placeholder = document.createElement('div');
                placeholder.className = 'pt-item';
                placeholder.style.visibility = 'hidden';
                placeholder.style.pointerEvents = 'none';
                placeholder.style.opacity = '0';
                placeholder.setAttribute('data-placeholder', 'true');
                c.appendChild(placeholder);
            }
        }
    }
    function togPt(id, el) { if (S.ptsSel.has(id)) { S.ptsSel.delete(id); el.classList.remove('sel'); } else { S.ptsSel.add(id); el.classList.add('sel'); } upd(); }
    function calcPts() { let t = 0; PD.forEach(p => { if (S.ptsSel.has(p.id)) t += p.p; }); return t; }


    function exch() {
        if (S.ptsSel.size === 0) return msg('请选择商品');
        const c = calcPts();
        if (c > S.pts) return msg('积分不足');

        // Show confirmation modal
        document.getElementById('conf-exch-pts').textContent = c;
        const imgContainer = document.getElementById('conf-exch-imgs');
        imgContainer.innerHTML = '';

        PD.forEach(p => {
            if (S.ptsSel.has(p.id)) {
                const img = document.createElement('i');
                img.className = `fas ${p.i}`;
                img.style.fontSize = '2rem';
                img.style.color = '#333';
                img.style.padding = '10px';
                img.style.background = '#f5f5f5';
                img.style.borderRadius = '8px';
                imgContainer.appendChild(img);
            }
        });

        document.getElementById('modal-confirm-exch').style.display = 'flex';
    }

    function confirmExch() {
        const c = calcPts();
        // Double check just in case
        if (c > S.pts) {
            closeConfirmExch();
            return msg('积分不足');
        }

        S.pts -= c;
        const tm = new Date().toLocaleString();
        
        // 为每个商品生成单独的记录
        PD.forEach(p => {
            if (S.ptsSel.has(p.id)) {
                addRec('p', { 
                    n: p.n, 
                    c: p.p, 
                    i: p.i, 
                    tm: tm, 
                    code: generateCode() 
                });
            }
        });

        S.ptsSel.clear();
        document.querySelectorAll('.pt-item').forEach(e => e.classList.remove('sel'));
        closeConfirmExch();
        msg('兑换成功');
        upd();
    }

    function closeConfirmExch() {
        document.getElementById('modal-confirm-exch').style.display = 'none';
    }

    function fav() {
        if (S.ptsSel.size === 0) return msg('请选择商品');
        PD.forEach(p => {
            if (S.ptsSel.has(p.id)) {
                if (!S.favs.some(f => f.id === p.id)) { S.favs.push({ id: p.id, n: p.n, p: p.p, i: p.i }); }
            }
        });
        S.ptsSel.clear(); document.querySelectorAll('.pt-item').forEach(e => e.classList.remove('sel'));
        msg(`已收藏 ${S.favs.length} 件商品`); upd();
    }

    function openFavs() { S.favSel.clear(); renderFavs(); document.getElementById('modal-favs').style.display = 'flex'; }
    function renderFavs() {
        const c = document.getElementById('fav-list');
        if (S.favs.length === 0) { c.innerHTML = '<div style="color:#888; text-align:center; width:200%;">暂无收藏</div>'; return; }
        let h = '';
        S.favs.forEach((f, idx) => {
            const isSel = S.favSel.has(idx);
            const safeIcon = escapeHtml(f.i);
            const safeName = escapeHtml(f.n);
            const safePoints = escapeHtml(f.p);
            h += `<div class="fav-item ${isSel ? 'sel' : ''}" onclick="App.togFavLi(${idx})">
         <div class="fav-check"><i class="fas fa-check"></i></div>
         <i class="fas ${safeIcon} fav-img"></i><div style="font-size:0.8rem">${safeName}</div><div style="color:#fff; font-weight:700"><i class="fas fa-coins" style="font-size:0.75rem; margin-right:4px;"></i>${safePoints} 积分</div>
     </div>`;
        });
        c.innerHTML = h;
    }
    function togFavLi(idx) { if (S.favSel.has(idx)) S.favSel.delete(idx); else S.favSel.add(idx); renderFavs(); }
    function actFav(act) {
        if (S.favSel.size === 0) return msg('请选择至少一个商品');
        if (act === 'del') {
            S.favs = S.favs.filter((_, i) => !S.favSel.has(i));
            S.favSel.clear(); renderFavs(); upd(); msg('已取消收藏');
        } else if (act === 'exch') {
            let cost = 0;
            S.favs.forEach((f, i) => { if (S.favSel.has(i)) { cost += f.p; } });
            if (cost > S.pts) return msg(`积分不足 (需 ${cost})`);
            S.pts -= cost;
            const tm = new Date().toLocaleString();
            // 为每个商品生成单独的记录
            S.favs.forEach((f, i) => { 
                if (S.favSel.has(i)) { 
                    addRec('p', { n: f.n, c: f.p, i: f.i, tm: tm, code: generateCode() }); 
                } 
            });
            S.favs = S.favs.filter((_, i) => !S.favSel.has(i));
            S.favSel.clear(); renderFavs(); upd(); msg('兑换成功!');
            document.getElementById('modal-favs').style.display = 'none';
        }
    }

    // HTML转义函数
    function escapeHtml(text) {
        if (text == null) return '';
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return String(text).replace(/[&<>"']/g, m => map[m]);
    }
    
    // JavaScript字符串转义函数（用于onclick属性）
    function escapeJsString(str) {
        if (str == null) return '';
        return String(str)
            .replace(/\\/g, '\\\\')
            .replace(/'/g, "\\'")
            .replace(/"/g, '\\"')
            .replace(/\n/g, '\\n')
            .replace(/\r/g, '\\r')
            .replace(/\t/g, '\\t');
    }

    function renderHome() {
        const c = document.getElementById('home-prod');
        // Use all products from SD (Shop Data) - combine all categories
        let all = [];
        Object.values(SD).forEach(arr => all = all.concat(arr));
        all.sort(() => 0.5 - Math.random());
        const items = all.slice(0, 100); // Show 100 products
        let h = '';
        items.forEach(i => {
            const icon = escapeHtml(i.i || 'fa-box');
            const itemJson = JSON.stringify(i).replace(/"/g, '&quot;');
            const productInfo = getProductInfo(i);
            const safeName = escapeJsString(i.n || '');
            const safeIcon = escapeJsString(icon);
            const safeImg = escapeJsString(i.img || '');
            h += `<div class="card home-card" onclick="App.showProductInfo(${itemJson})">
        <div class="card-img"><i class="fas ${icon}" style="font-size:3rem; color:var(--accent)"></i></div>
        <div class="card-desc">
            <div class="card-desc-text">${escapeHtml(productInfo.desc)}</div>
            <div class="card-desc-rating">推荐指数: ${productInfo.starsHtml} ${productInfo.rating.toFixed(1)}</div>
        </div>
        <div class="card-foot">
            <div class="foot-btns">
                <div class="f-btn fb-price" onclick="event.stopPropagation(); App.showProductInfo(${itemJson})">单价${escapeHtml(i.p)}</div>
                <div class="f-btn fb-koko" onclick="event.stopPropagation(); App.toLucky('${safeName}', ${i.p}, '${safeIcon}', '${safeImg}')">AFRICA购</div>
            </div>
        </div>
    </div>`
        });
        c.innerHTML = h;
    }
    function renderCats() {
        const c = document.getElementById('shop-cats');
        const k = [
            { k: 'ph', l: '手机通讯', i: 'fa-mobile-alt' },
            { k: 'sp', l: '运动服饰', i: 'fa-tshirt' },
            { k: 'fa', l: '时尚名品', i: 'fa-shopping-bag' },
            { k: 'li', l: '生活用品', i: 'fa-home' },
            { k: 'di', l: '电脑数码', i: 'fa-laptop' },
            { k: 'sh', l: '服装鞋帽', i: 'fa-shoe-prints' },
            { k: 'be', l: '美妆配饰', i: 'fa-magic' },
            { k: 'fu', l: '家具家居', i: 'fa-couch' },
            { k: 'bk', l: '图书书籍', i: 'fa-book' },
            { k: 'fit', l: '健身装备', i: 'fa-dumbbell' },
            { k: 'toy', l: '玩具游戏', i: 'fa-gamepad' },
            { k: 'car', l: '汽车用品', i: 'fa-car' },
            { k: 'mus', l: '音乐乐器', i: 'fa-music' },
            { k: 'jew', l: '珠宝首饰', i: 'fa-gem' },
            { k: 'art', l: '艺术用品', i: 'fa-palette' },
            { k: 'wat', l: '水上运动', i: 'fa-swimmer' },
            { k: 'gam', l: '游戏点卡', i: 'fa-gamepad' },
            { k: 'pet', l: '宠物用品', i: 'fa-paw' },
            { k: 'gard', l: '园艺用品', i: 'fa-leaf' },
            { k: 'bag', l: '旅行箱包', i: 'fa-suitcase' },
            { k: 'out', l: '户外运动', i: 'fa-mountain' },
            { k: 'baby', l: '婴儿用品', i: 'fa-baby' },
            { k: 'tool', l: '五金工具', i: 'fa-tools' },
            { k: 'sh2', l: '精品二手', i: 'fa-recycle' }
        ];
        
        let h = '';
        
        // 获取当前选中的品类key
        const activeBtn = document.querySelector('.cat-btn.active');
        let activeKey = 'ph';
        if (activeBtn && activeBtn.getAttribute('onclick')) {
            const match = activeBtn.getAttribute('onclick').match(/'([^']+)'/);
            if (match) activeKey = match[1];
        }
        
        // 检查是否展开
        const isExpanded = c.classList.contains('expanded');
        
        // 默认只显示前4个，展开时显示全部
        const visibleCats = isExpanded ? k : k.slice(0, 4);
        
        visibleCats.forEach((x, i) => {
            const isActive = x.k === activeKey;
            const safeKey = escapeJsString(x.k);
            h += `<div class="cat-btn ${isActive ? 'active' : ''}" onclick="App.swt('${safeKey}',this)">${escapeHtml(x.l)}</div>`;
        });
        
        // 显示展开/折叠按钮
        const expandBtn = document.getElementById('cat-expand-btn');
        if (expandBtn) {
            const arrowIcon = isExpanded ? 'fa-chevron-up' : 'fa-chevron-down';
            expandBtn.querySelector('i').className = `fas ${arrowIcon}`;
            expandBtn.style.display = 'flex';
        }
        
        c.innerHTML = h;
    }
    
    // 渲染品类下拉弹出框
    function renderCatDropdown(allCats, hiddenCats) {
        let dropdown = document.getElementById('cat-dropdown');
        if (!dropdown) {
            dropdown = document.createElement('div');
            dropdown.id = 'cat-dropdown';
            dropdown.className = 'cat-dropdown';
            dropdown.innerHTML = `
                <div class="cat-dropdown-content">
                    <div class="cat-dropdown-title">选择品类</div>
                    <div class="cat-dropdown-grid" id="cat-dropdown-grid"></div>
                </div>
            `;
            dropdown.onclick = function(e) {
                if (e.target === dropdown) {
                    closeCatDropdown();
                }
            };
            document.body.appendChild(dropdown);
        }
        
        const grid = document.getElementById('cat-dropdown-grid');
        if (!grid) return;
        
        // 获取当前选中的品类
        const activeBtn = document.querySelector('.cat-btn.active');
        let activeKey = 'ph';
        if (activeBtn && activeBtn.getAttribute('onclick')) {
            const match = activeBtn.getAttribute('onclick').match(/'([^']+)'/);
            if (match) activeKey = match[1];
        }
        
        let h = '';
        allCats.forEach((x) => {
            const isActive = x.k === activeKey;
            const safeKey = escapeJsString(x.k);
            h += `<div class="cat-dropdown-btn ${isActive ? 'active' : ''}" onclick="App.selectCategoryFromDropdown('${safeKey}')">${escapeHtml(x.l)}</div>`;
        });
        grid.innerHTML = h;
    }
    
    // 切换品类展开/折叠
    function toggleCatExpand() {
        const c = document.getElementById('shop-cats');
        if (!c) return;
        
        const isExpanded = c.classList.contains('expanded');
        if (isExpanded) {
            // 折叠：移除expanded类
            c.classList.remove('expanded');
        } else {
            // 展开：添加expanded类
            c.classList.add('expanded');
        }
        
        // 重新渲染品类按钮
        renderCats();
        
        // 更新展开/折叠按钮图标
        const expandBtn = document.getElementById('cat-expand-btn');
        if (expandBtn) {
            const arrowIcon = c.classList.contains('expanded') ? 'fa-chevron-up' : 'fa-chevron-down';
            expandBtn.querySelector('i').className = `fas ${arrowIcon}`;
        }
    }
    
    // 打开品类下拉弹出框（保留以兼容旧代码）
    function openCatDropdown() {
        toggleCatExpand();
    }
    
    // 关闭品类下拉弹出框（保留以兼容旧代码）
    function closeCatDropdown() {
        const c = document.getElementById('shop-cats');
        if (c && c.classList.contains('expanded')) {
            toggleCatExpand();
        }
    }
    
    // 从下拉框选择品类
    function selectCategoryFromDropdown(catKey) {
        // 直接切换品类，更新产品列表
        const allCats = [
            { k: 'ph', l: '手机通讯', i: 'fa-mobile-alt' },
            { k: 'sp', l: '运动服饰', i: 'fa-tshirt' },
            { k: 'fa', l: '时尚名品', i: 'fa-shopping-bag' },
            { k: 'li', l: '生活用品', i: 'fa-home' },
            { k: 'di', l: '电脑数码', i: 'fa-laptop' },
            { k: 'sh', l: '服装鞋帽', i: 'fa-shoe-prints' },
            { k: 'be', l: '美妆配饰', i: 'fa-magic' },
            { k: 'fu', l: '家具家居', i: 'fa-couch' },
            { k: 'bk', l: '图书书籍', i: 'fa-book' },
            { k: 'fit', l: '健身装备', i: 'fa-dumbbell' },
            { k: 'toy', l: '玩具游戏', i: 'fa-gamepad' },
            { k: 'car', l: '汽车用品', i: 'fa-car' },
            { k: 'mus', l: '音乐乐器', i: 'fa-music' },
            { k: 'jew', l: '珠宝首饰', i: 'fa-gem' },
            { k: 'art', l: '艺术用品', i: 'fa-palette' },
            { k: 'wat', l: '水上运动', i: 'fa-swimmer' },
            { k: 'gam', l: '游戏点卡', i: 'fa-gamepad' },
            { k: 'pet', l: '宠物用品', i: 'fa-paw' },
            { k: 'gard', l: '园艺用品', i: 'fa-leaf' },
            { k: 'bag', l: '旅行箱包', i: 'fa-suitcase' },
            { k: 'out', l: '户外运动', i: 'fa-mountain' },
            { k: 'baby', l: '婴儿用品', i: 'fa-baby' },
            { k: 'tool', l: '五金工具', i: 'fa-tools' },
            { k: 'sh2', l: '精品二手', i: 'fa-recycle' }
        ];
        
        const catIndex = allCats.findIndex(c => c.k === catKey);
        if (catIndex === -1) return;
        
        // 如果选中的是前4个，直接切换
        if (catIndex < 4) {
            const btn = document.querySelectorAll('.cat-btn')[catIndex];
            if (btn && !btn.classList.contains('more-btn')) {
                swt(catKey, btn);
            }
        } else {
            // 如果选中的是后面的，将选中的品类移到第一个位置
            // 重新排列：选中的品类 + 原来的前3个（排除选中的）
            const selectedCat = allCats[catIndex];
            const currentFirstFour = allCats.slice(0, 4);
            const newFirstFour = [selectedCat, ...currentFirstFour.filter(c => c.k !== catKey).slice(0, 3)];
            
            // 重新渲染品类按钮（保持展开状态）
            const c = document.getElementById('shop-cats');
            const wasExpanded = c.classList.contains('expanded');
            let h = '';
            newFirstFour.forEach((x, i) => {
                h += `<div class="cat-btn ${i === 0 ? 'active' : ''}" onclick="App.swt('${x.k}',this)"><i class="fas ${x.i}"></i> ${x.l}</div>`;
            });
            
            // 如果是展开状态，显示所有品类
            if (wasExpanded) {
                const remainingCats = allCats.filter(c => !newFirstFour.some(n => n.k === c.k));
                remainingCats.forEach((x) => {
                    h += `<div class="cat-btn" onclick="App.swt('${x.k}',this)"><i class="fas ${x.i}"></i> ${x.l}</div>`;
                });
            }
            
            c.innerHTML = h;
            
            // 更新展开/折叠按钮（在类别区域下方）
            const expandBtn = document.getElementById('cat-expand-btn');
            if (expandBtn) {
                const arrowIcon = wasExpanded ? 'fa-chevron-up' : 'fa-chevron-down';
                expandBtn.querySelector('i').className = `fas ${arrowIcon}`;
                expandBtn.style.display = 'flex';
            }
            
            // 切换选中状态并更新产品列表
            setTimeout(() => {
                const btn = document.querySelectorAll('.cat-btn')[0];
                if (btn) {
                    swt(catKey, btn);
                }
            }, 50);
        }
        
        // 如果下拉框存在，关闭它
        const dropdown = document.getElementById('cat-dropdown');
        if (dropdown && dropdown.classList.contains('active')) {
            closeCatDropdown();
        }
    }
    
    // 更新下拉框中的选中状态
    function updateDropdownActiveState() {
        const activeBtn = document.querySelector('.cat-btn.active');
        if (!activeBtn) return;
        
        const activeText = activeBtn.textContent.trim();
        const dropdownBtns = document.querySelectorAll('.cat-dropdown-btn');
        dropdownBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.textContent.trim() === activeText) {
                btn.classList.add('active');
            }
        });
    }


    /* Search logic: perform search across all categories */
    function doSearch(q) {
        const inputEl = document.getElementById('shop-search-input');
        const v = (q !== undefined) ? ('' + q).trim() : (inputEl ? inputEl.value.trim() : '');
        if (!v) return msg('请输入搜索关键词');
        // do not save search history; clear any existing history display
        S.searchHist = [];
        try { localStorage.removeItem('koko_search_hist'); } catch (e) { }
        renderSearchHistory();
        // find across SD
        let all = []; Object.values(SD).forEach(arr => all = all.concat(arr));
        const ql = v.toLowerCase();
        const res = all.filter(it => (it.n && it.n.toLowerCase().includes(ql)) || (it.b && it.b.toLowerCase().includes(ql)) || (it.t && it.t.toLowerCase().includes(ql)));
        if (res.length > 0) {
            renderShopResults(res);
        } else {
            // fuzzy/similar match: characters in order
            function fuzzyMatch(s, q) {
                if (!s) return false;
                let i = 0;
                for (let c of s) {
                    if (c === q[i]) i++;
                    if (i === q.length) return true;
                }
                return false;
            }
            const alt = all.filter(it => (it.n && fuzzyMatch(it.n.toLowerCase(), ql)) || (it.b && fuzzyMatch(it.b.toLowerCase(), ql)) || (it.t && fuzzyMatch(it.t.toLowerCase(), ql)));
            renderShopResults(alt.length ? alt : []);
        }
        // clear search input after performing search
        try { if (inputEl) inputEl.value = ''; } catch (e) { }
    }

    function renderSearchHistory() {
        const c = document.getElementById('search-history');
        if (!c) return;
        // do not load or display search history
        S.searchHist = [];
        c.innerHTML = '<div style="color:#888;padding:8px"></div>';
        return;
    }

    function clearSearchHistory() { S.searchHist = []; try { localStorage.removeItem('koko_search_hist'); } catch (e) { } renderSearchHistory(); msg('历史已清空'); }
    function delSearchHist(idx) { if (!S.searchHist) return; S.searchHist.splice(idx, 1); try { localStorage.setItem('koko_search_hist', JSON.stringify(S.searchHist)); } catch (e) { } renderSearchHistory(); }
    function toggleSearchHist() { const c = document.getElementById('search-history'); if (!c) return; if (c.classList.contains('collapsed')) { c.classList.remove('collapsed'); } else { c.classList.add('collapsed'); } }
    // 生成产品描述和推荐指数（确保每个产品都有不同的值）
    function getProductInfo(item) {
        const descs = {
            'iPhone': ['A15芯片，超强性能，拍照出色', 'A16芯片，Pro级体验，专业摄影', 'A14芯片，经典设计，流畅体验'],
            'Apple': ['品质卓越，设计精美，系统流畅', '品牌保证，用户体验极佳', '创新科技，简约时尚'],
            'Xiaomi': ['性价比高，功能丰富，配置强大', '智能生态，科技感强', '年轻时尚，性能强劲'],
            'HUAWEI': ['拍照优秀，信号稳定，续航持久', '国产精品，技术领先', '商务首选，品质可靠'],
            'Samsung': ['屏幕出色，性能强劲，设计时尚', '全球品牌，品质可靠', '创新科技，显示优秀'],
            'Nike': ['运动首选，舒适透气，经典设计', '专业运动，品质保证', '时尚潮流，运动必备'],
            'Adidas': ['时尚潮流，舒适耐穿，品牌经典', '运动时尚，年轻活力', '经典三杠，品质保证'],
            'LV': ['奢华品质，经典设计，收藏价值', '顶级品牌，尊贵体验', '法国工艺，永恒经典'],
            'Gucci': ['时尚潮流，精致工艺，品牌价值', '意大利精品，高端时尚', '经典双G，奢华体验']
        };
        
        const ratings = {
            'iPhone': [4.8, 4.9, 4.7],
            'Apple': [4.7, 4.8, 4.6],
            'Xiaomi': [4.5, 4.6, 4.4],
            'HUAWEI': [4.6, 4.7, 4.5],
            'Samsung': [4.6, 4.7, 4.5],
            'Nike': [4.7, 4.8, 4.6],
            'Adidas': [4.6, 4.7, 4.5],
            'LV': [4.9, 5.0, 4.8],
            'Gucci': [4.8, 4.9, 4.7]
        };
        
        // 根据产品ID或名称生成唯一索引，确保每个产品都有不同的描述和评分
        let hash = 0;
        const str = (item.id || '') + (item.n || '') + (item.b || '');
        for (let i = 0; i < str.length; i++) {
            hash = ((hash << 5) - hash) + str.charCodeAt(i);
            hash = hash & hash;
        }
        const productIndex = Math.abs(hash) % 3;
        
        // 根据品牌和价格生成描述和推荐指数
        let desc = '品质保证，值得信赖，性价比高';
        let rating = 4.5;
        
        for (let brand in descs) {
            if (item.b && item.b.includes(brand)) {
                const brandDescs = descs[brand];
                const brandRatings = ratings[brand];
                desc = brandDescs[productIndex % brandDescs.length] || desc;
                rating = brandRatings ? brandRatings[productIndex % brandRatings.length] : rating;
                // 根据价格微调评分
                if (item.p > 5000) {
                    rating += 0.1;
                } else if (item.p < 500) {
                    rating -= 0.1;
                }
                rating = Math.min(5.0, Math.max(3.5, rating));
                break;
            }
        }
        
        // 如果没有匹配的品牌，根据价格和产品索引生成
        if (desc === '品质保证，值得信赖，性价比高') {
            const genericDescs = [
                ['高端品质，奢华体验，收藏价值', '优质产品，性能出色，值得拥有', '精品推荐，品质保证'],
                ['性价比高，功能实用，品质可靠', '实用耐用，超值选择', '经济实惠，物超所值'],
                ['经济实惠，实用耐用，超值选择', '性价比之选，品质可靠', '实用首选，价格亲民']
            ];
            const genericRatings = [
                [4.8, 4.6, 4.7],
                [4.5, 4.4, 4.3],
                [4.3, 4.2, 4.1]
            ];
            
            let priceTier = 0;
            if (item.p > 10000) {
                priceTier = 0;
            } else if (item.p > 2000) {
                priceTier = 1;
            } else {
                priceTier = 2;
            }
            
            desc = genericDescs[priceTier][productIndex % 3];
            rating = genericRatings[priceTier][productIndex % 3];
        }
        
        // 根据产品ID最后一位数字微调评分，确保每个产品都有不同的评分
        const idLastDigit = item.id ? parseInt(item.id.slice(-1)) || 0 : 0;
        rating = rating + (idLastDigit % 10) * 0.02 - 0.09;
        rating = Math.min(5.0, Math.max(3.5, Math.round(rating * 10) / 10));
        
        // 生成星星显示
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        let starsHtml = '';
        for (let i = 0; i < fullStars; i++) {
            starsHtml += '<i class="fas fa-star item-rating-stars"></i>';
        }
        if (hasHalfStar) {
            starsHtml += '<i class="fas fa-star-half-alt item-rating-stars"></i>';
        }
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        for (let i = 0; i < emptyStars; i++) {
            starsHtml += '<i class="far fa-star item-rating-stars"></i>';
        }
        
        return { desc, rating, starsHtml };
    }
    
    function swt(k, el) {
        // 切换品类时保持展开状态，仅由小箭头控制展开/折叠
        document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
        el.classList.add('active');
        renderShop(k);
    }
    function renderShop(k) {
        const c = document.getElementById('shop-list');
        const d = SD[k];
        let h = '';
        d.forEach(i => {
            const icon = escapeHtml(i.i || 'fa-box');
            const imgHtml = `<i class="fas ${icon}" style="font-size:3rem; color:var(--accent)"></i>`;
            const itemJson = JSON.stringify(i).replace(/"/g, '&quot;');
            const productInfo = getProductInfo(i);
            const safeName = escapeJsString(i.n || '');
            const safeIcon = escapeJsString(icon);
            const safeImg = escapeJsString(i.img || '');
            h += `<div class="shop-item" onclick="App.showProductInfo(${itemJson})">
        <div class="shop-info">
            <div>
                <div class="item-brand-name">${escapeHtml(i.b || 'Brand')} ${escapeHtml(i.n)}</div>
                <div class="item-desc">${escapeHtml(productInfo.desc)}</div>
                <div class="item-rating">推荐指数: ${productInfo.starsHtml} ${productInfo.rating.toFixed(1)}</div>
            </div>
            <div class="foot-btns">
                <div class="f-btn fb-price" onclick="event.stopPropagation(); App.showProductInfo(${itemJson})">单价${escapeHtml(i.p)}</div>
                <div class="f-btn fb-koko" onclick="event.stopPropagation(); App.toLucky('${safeName}', ${i.p}, '${safeIcon}', '${safeImg}')">AFRICA购</div>
            </div>
        </div>
        <div class="shop-img-placeholder">${imgHtml}</div>
     </div>`
        });
        c.innerHTML = h;
    }

    /* Render a list of shop items from an array (used for search results) */
    function renderShopResults(items) {
        const c = document.getElementById('shop-list');
        if (!items || items.length === 0) { c.innerHTML = '<div class="empty-msg">未找到相关商品</div>'; return; }
        let h = '';
        items.forEach(i => {
            const icon = escapeHtml(i.i || 'fa-box');
            const imgHtml = `<i class="fas ${icon}" style="font-size:3rem; color:var(--accent);"></i>`;
            const itemJson = JSON.stringify(i).replace(/"/g, '&quot;');
            const productInfo = getProductInfo(i);
            const safeName = escapeJsString(i.n || '');
            const safeIcon = escapeJsString(icon);
            const safeImg = escapeJsString(i.img || '');
            h += `<div class="shop-item" onclick="App.showProductInfo(${itemJson})">
        <div class="shop-info">
            <div>
                <div class="item-brand-name">${escapeHtml(i.b || 'Brand')} ${escapeHtml(i.n)}</div>
                <div class="item-desc">${escapeHtml(productInfo.desc)}</div>
                <div class="item-rating">推荐指数: ${productInfo.starsHtml} ${productInfo.rating.toFixed(1)}</div>
            </div>
            <div class="foot-btns">
                <div class="f-btn fb-price" onclick="event.stopPropagation(); App.showProductInfo(${itemJson})">单价${escapeHtml(i.p)}</div>
                <div class="f-btn fb-koko" onclick="event.stopPropagation(); App.toLucky('${safeName}', ${i.p}, '${safeIcon}', '${safeImg}')">AFRICA购</div>
            </div>
        </div>
        <div class="shop-img-placeholder">${imgHtml}</div>
     </div>`;
        });
        c.innerHTML = h;
    }
    function addRec(t, d) {
        const tm = d.tm || new Date().toLocaleString();
        if (t === 'l') { 
            S.rec.l.unshift(d); 
            const w = d.w; 
            const safeJson = JSON.stringify(d).replace(/"/g, '&quot;');
            const h = `<div class="rec-item"><div class="rec-l"><div><div style="font-weight:700;font-size:0.9rem;color:var(--accent)">${w ? '已中奖' : '未中奖'}</div><div style="font-size:0.7rem;color:#888">${escapeHtml(tm)}</div></div></div><div class="rec-btn" onclick='App.det(${safeJson})'>详情查看 <i class="fas fa-chevron-right"></i></div></div>`; 
            ins('lst-lucky', h);
            // 如果中奖，更新中奖信息滚动
            if (w) {
                updateWinNotice();
            }
        }
        else if (t === 'o') { 
            S.rec.o.unshift(d); 
            const safeJson = JSON.stringify(d).replace(/"/g, '&quot;');
            const safeName = escapeHtml(d.n);
            const safeTm = escapeHtml(tm);
            const safePrice = escapeHtml(d.p);
            const h = `<div class="rec-item" onclick='App.showItemDetail(${safeJson})'><div class="rec-l"><div><div style="font-weight:700;font-size:0.9rem;color:var(--accent)">${safeName}</div><div style="font-size:0.7rem;color:var(--accent)">${safeTm}</div></div></div><div class="rec-r">¥${safePrice}</div></div>`; 
            ins('lst-orig', h); 
        }
        else { 
            S.rec.p.unshift(d); 
            const safeJson = JSON.stringify(d).replace(/"/g, '&quot;');
            const safeName = escapeHtml(Array.isArray(d.n) ? d.n.join(', ') : d.n);
            const safeTm = escapeHtml(tm);
            const safePoints = escapeHtml(d.c);
            const h = `<div class="rec-item" onclick='App.showItemDetail(${safeJson})'><div class="rec-l"><div><div style="font-weight:700;font-size:0.9rem;color:var(--accent)">${safeName}</div><div style="font-size:0.7rem;color:var(--accent)">${safeTm}</div></div></div><div class="rec-r">${safePoints}积分</div></div>`; 
            ins('lst-pts', h); 
        }
    }
    function showItemDetail(d) {
        const icon = d.i || 'fa-box';
        const name = Array.isArray(d.n) ? d.n.join(', ') : d.n;
        const cost = d.p ? `¥${d.p}` : `${d.c} 积分`;
        const time = d.tm;

        document.getElementById('det-i-icon').className = `fas ${icon}`;
        document.getElementById('det-i-name').textContent = name;
        document.getElementById('det-i-cost').textContent = cost;
        document.getElementById('det-i-time').textContent = time;

        const cCode = document.getElementById('det-i-code-row');
        if (d.code) {
            // 先显示对话框和文字内容，图片异步加载
            document.getElementById('det-i-code-text').textContent = d.code;
            cCode.style.display = 'flex';
            // 显示对话框
            document.getElementById('modal-item-detail').style.display = 'flex';
            // 然后异步加载图片
            const img = document.getElementById('det-i-code-img');
            img.src = 'https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=' + d.code;
        } else {
            cCode.style.display = 'none';
        document.getElementById('modal-item-detail').style.display = 'flex';
        }
    }
    function ins(id, h) { const l = document.getElementById(id); const e = l.querySelector('.empty-msg'); if (e) e.remove(); const z = document.createElement('div'); z.innerHTML = h; l.insertBefore(z.firstElementChild, l.firstChild); }
    function det(d) {
        document.getElementById('det-win').textContent = d.winNum;
        const winMsgEl = document.getElementById('det-win-msg');
        if (d.w) {
            winMsgEl.style.display = 'none';
        } else {
            winMsgEl.textContent = '未中奖，获得 ' + (d.v || 0) + ' 积分';
            winMsgEl.style.display = 'block';
            winMsgEl.style.color = '#fff';
        }
        const c = document.getElementById('det-user');
        c.innerHTML = '';
        d.nums.forEach(n => {
            const sp = document.createElement('span');
            sp.className = 'num-badge' + (n === d.winNum ? ' win-num' : '');
            sp.textContent = n;
            c.appendChild(sp);
        });

        const cCode = document.getElementById('det-code-row');
        const cPts = document.getElementById('det-pts-row');
        if (d.w && d.code) {
            // 先显示对话框和文字内容，图片异步加载
            document.getElementById('det-code-text').textContent = d.code;
            cCode.style.display = 'flex';
            cPts.style.display = 'none';
            // 显示对话框
            document.getElementById('modal-detail').style.display = 'flex';
            // 然后异步加载图片
            const img = document.getElementById('det-code-img');
            img.src = 'https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=' + d.code;
        } else {
            cCode.style.display = 'none';
            document.getElementById('det-pts').textContent = '+' + d.v + ' 积分';
            cPts.style.display = 'block';
        document.getElementById('modal-detail').style.display = 'flex';
        }
    }
    function handleFileChange(input) {
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                if (!S.u) S.u = { name: '', phone: '', email: '' };
                S.u.avatar = e.target.result;
                const p = document.getElementById('reg-avatar-preview');
                if (p) {
                    // 显示选择的图片
                p.style.backgroundImage = `url(${e.target.result})`;
                p.style.backgroundSize = 'cover';
                    p.style.backgroundPosition = 'center';
                    p.style.backgroundRepeat = 'no-repeat';
                    p.innerHTML = ''; // 清空图标
                }
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    function openReg() {
        document.getElementById('modal-reg').style.display = 'flex';
        if (S.u) {
            document.getElementById('r-name').value = S.u.name;
            document.getElementById('r-tel').value = S.u.phone;
            document.getElementById('r-mail').value = S.u.email;
                const p = document.getElementById('reg-avatar-preview');
            if (p) {
                if (S.u.avatar) {
                    // 显示保存的头像
                p.style.backgroundImage = `url(${S.u.avatar})`;
                p.style.backgroundSize = 'cover';
                    p.style.backgroundPosition = 'center';
                    p.style.backgroundRepeat = 'no-repeat';
                    p.innerHTML = ''; // 清空图标
                } else {
                    // 显示默认图标
                    p.style.backgroundImage = '';
                    p.style.background = 'linear-gradient(135deg, #5271FF, #00F0FF)';
                    p.style.backgroundSize = '';
                    p.innerHTML = '<i class="fas fa-camera" style="font-size:2rem"></i>';
                    p.style.color = '#fff';
                }
            }
        } else {
            // 如果没有用户信息，显示默认图标
            const p = document.getElementById('reg-avatar-preview');
            if (p) {
                p.style.backgroundImage = '';
                p.style.background = 'linear-gradient(135deg, #5271FF, #00F0FF)';
                p.style.backgroundSize = '';
                p.innerHTML = '<i class="fas fa-camera" style="font-size:2rem"></i>';
                p.style.color = '#fff';
            }
        }
    }
    function subReg() {
        const n = val('r-name'), p = val('r-tel'), e = val('r-mail');
        if (!n) return msg('请输入姓名');
        const av = (S.u && S.u.avatar) ? S.u.avatar : null;
        S.u = { name: n, phone: p, email: e, avatar: av };
        document.getElementById('modal-reg').style.display = 'none';
        msg('保存成功');
        upd();
    }
    function val(id) { return document.getElementById(id).value; }
    function openCS() { document.getElementById('modal-cs').style.display = 'flex'; }
    function subCS() { if (!val('cs-txt')) return msg('内容不能为空'); document.getElementById('cs-txt').value = ''; document.getElementById('modal-cs').style.display = 'none'; msg('发送成功'); }
    // Google OAuth 客户端 ID 配置
    // 请到 https://console.cloud.google.com/ 创建 OAuth 2.0 客户端 ID 并替换下面的值
    // 或者使用 window.GOOGLE_CLIENT_ID 在页面加载前设置
    const GOOGLE_CLIENT_ID = window.GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com';
    
    function loginGoogle() {
        // 检查是否配置了客户端 ID
        if (!GOOGLE_CLIENT_ID || GOOGLE_CLIENT_ID === 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com') {
            const setupMsg = '请先配置 Google OAuth 客户端 ID。\n\n' +
                '1. 访问 https://console.cloud.google.com/\n' +
                '2. 创建项目并启用 Google+ API\n' +
                '3. 创建 OAuth 2.0 客户端 ID\n' +
                '4. 在页面中添加: window.GOOGLE_CLIENT_ID = "你的客户端ID";\n\n' +
                '或者直接修改代码中的 GOOGLE_CLIENT_ID 变量。';
            alert(setupMsg);
            console.log('Google OAuth 客户端 ID 未配置。请设置 window.GOOGLE_CLIENT_ID 或修改代码中的 GOOGLE_CLIENT_ID 变量。');
            return;
        }
        
        // 检查 Google Identity Services 是否已加载
        if (typeof google === 'undefined' || !google.accounts) {
            msg('正在加载 Google 登录服务，请稍候...');
            // 如果未加载，等待加载完成
            const checkGoogle = setInterval(() => {
                if (typeof google !== 'undefined' && google.accounts) {
                    clearInterval(checkGoogle);
                    initGoogleLogin();
                }
            }, 100);
            setTimeout(() => {
                clearInterval(checkGoogle);
                if (typeof google === 'undefined' || !google.accounts) {
                    msg('Google 登录服务加载失败，请刷新页面重试');
                }
            }, 5000);
            return;
        }
        initGoogleLogin();
    }
    
    function initGoogleLogin() {
        try {
            // 使用 Google Identity Services 进行登录
            google.accounts.id.initialize({
                client_id: GOOGLE_CLIENT_ID,
                callback: handleGoogleCredentialResponse,
                auto_select: false,
                cancel_on_tap_outside: true
            });
            
            // 尝试使用 One Tap 登录
            google.accounts.id.prompt((notification) => {
                if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
                    // One Tap 不可用，使用弹出窗口登录
                    const tokenClient = google.accounts.oauth2.initTokenClient({
                        client_id: GOOGLE_CLIENT_ID,
                        scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
                        callback: handleGoogleTokenResponse,
                    });
                    tokenClient.requestAccessToken({ prompt: 'consent' });
                }
            });
        } catch (error) {
            console.error('初始化 Google 登录失败:', error);
            msg('登录初始化失败，请检查配置');
        }
    }
    
    function handleGoogleCredentialResponse(response) {
        // 解码 JWT token 获取用户信息
        try {
            const payload = JSON.parse(atob(response.credential.split('.')[1]));
            const email = payload.email || '';
            const name = payload.name || email.split('@')[0] || '用户';
            const picture = payload.picture || '';
            
            // 保存用户信息
            S.u = {
                name: name,
                email: email,
                phone: '',
                avatar: picture
            };
            
            // 保存到 localStorage（如果应用需要持久化）
            try {
                localStorage.setItem('user', JSON.stringify(S.u));
            } catch (e) {
                console.warn('无法保存用户信息到本地存储:', e);
            }
            
            msg('Google 登录成功！');
            // 跳转到主页
            setTimeout(() => {
                nav('home');
            }, 500);
        } catch (error) {
            console.error('解析 Google 响应失败:', error);
            msg('登录失败，请重试');
        }
    }
    
    function handleGoogleTokenResponse(tokenResponse) {
        // 使用 access token 获取用户信息
        if (tokenResponse.error) {
            console.error('Google OAuth 错误:', tokenResponse.error);
            msg('登录失败: ' + tokenResponse.error);
            return;
        }
        
        fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: {
                'Authorization': `Bearer ${tokenResponse.access_token}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('获取用户信息失败');
            }
            return response.json();
        })
        .then(data => {
            const email = data.email || '';
            const name = data.name || email.split('@')[0] || '用户';
            const picture = data.picture || '';
            
            // 保存用户信息
            S.u = {
                name: name,
                email: email,
                phone: '',
                avatar: picture
            };
            
            // 保存到 localStorage（如果应用需要持久化）
            try {
                localStorage.setItem('user', JSON.stringify(S.u));
            } catch (e) {
                console.warn('无法保存用户信息到本地存储:', e);
            }
            
            msg('Google 登录成功！');
            // 跳转到主页
            setTimeout(() => {
                nav('home');
            }, 500);
        })
        .catch(error => {
            console.error('获取用户信息失败:', error);
            msg('登录失败，请重试');
        });
    }
    // Facebook OAuth 应用 ID 配置
    // 请到 https://developers.facebook.com/ 创建应用并获取 App ID
    // 或者使用 window.FACEBOOK_APP_ID 在页面加载前设置
    const FACEBOOK_APP_ID = window.FACEBOOK_APP_ID || 'YOUR_FACEBOOK_APP_ID';
    
    function loginFacebook() {
        // 检查是否配置了 App ID
        if (!FACEBOOK_APP_ID || FACEBOOK_APP_ID === 'YOUR_FACEBOOK_APP_ID') {
            const setupMsg = '请先配置 Facebook App ID。\n\n' +
                '1. 访问 https://developers.facebook.com/\n' +
                '2. 创建应用并获取 App ID\n' +
                '3. 在页面中添加: window.FACEBOOK_APP_ID = "你的App ID";\n\n' +
                '或者直接修改代码中的 FACEBOOK_APP_ID 变量。';
            alert(setupMsg);
            console.log('Facebook App ID 未配置。请设置 window.FACEBOOK_APP_ID 或修改代码中的 FACEBOOK_APP_ID 变量。');
            return;
        }
        
        // 检查 Facebook SDK 是否已加载
        if (typeof FB === 'undefined') {
            msg('正在加载 Facebook 登录服务，请稍候...');
            const checkFB = setInterval(() => {
                if (typeof FB !== 'undefined') {
                    clearInterval(checkFB);
                    initFacebookLogin();
                }
            }, 100);
            setTimeout(() => {
                clearInterval(checkFB);
                if (typeof FB === 'undefined') {
                    msg('Facebook 登录服务加载失败，请刷新页面重试');
                }
            }, 5000);
            return;
        }
        initFacebookLogin();
    }
    
    function initFacebookLogin() {
        try {
            // 初始化 Facebook SDK
            FB.init({
                appId: FACEBOOK_APP_ID,
                cookie: true,
                xfbml: true,
                version: 'v18.0'
            });
            
            // 请求登录权限
            FB.login(function(response) {
                if (response.authResponse) {
                    // 登录成功，获取用户信息
                    FB.api('/me', {fields: 'name,email,picture'}, function(userInfo) {
                        if (userInfo && !userInfo.error) {
                            const email = userInfo.email || '';
                            const name = userInfo.name || email.split('@')[0] || '用户';
                            const picture = (userInfo.picture && userInfo.picture.data && userInfo.picture.data.url) || '';
                            
                            // 保存用户信息
                            S.u = {
                                name: name,
                                email: email,
                                phone: '',
                                avatar: picture
                            };
                            
                            // 保存到 localStorage
                            try {
                                localStorage.setItem('user', JSON.stringify(S.u));
                            } catch (e) {
                                console.warn('无法保存用户信息到本地存储:', e);
                            }
                            
                            msg('Facebook 登录成功！');
                            // 跳转到主页
                            setTimeout(() => {
                                nav('home');
                            }, 500);
                        } else {
                            console.error('获取用户信息失败:', userInfo.error);
                            msg('登录失败，请重试');
                        }
                    });
                } else {
                    console.log('用户取消登录');
                    msg('登录已取消');
                }
            }, {scope: 'email,public_profile'});
        } catch (error) {
            console.error('初始化 Facebook 登录失败:', error);
            msg('登录初始化失败，请检查配置');
        }
    }
    
    function loginEmail() {
        // 显示邮箱登录模态框
        document.getElementById('modal-email-login').style.display = 'flex';
        // 清空输入框
        document.getElementById('email-input').value = '';
        document.getElementById('email-name').value = '';
        // 聚焦到邮箱输入框
        setTimeout(() => {
            document.getElementById('email-input').focus();
        }, 100);
    }
    
    function submitEmailLogin() {
        const email = document.getElementById('email-input').value.trim();
        const name = document.getElementById('email-name').value.trim();
        
        if (!email) {
            msg('请输入邮箱地址');
            return;
        }
        
        // 简单的邮箱格式验证
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            msg('请输入有效的邮箱地址');
            return;
        }
        
        // 保存用户信息
        const userName = name || email.split('@')[0] || '用户';
        S.u = {
            name: userName,
            email: email,
            phone: '',
            avatar: ''
        };
        
        // 保存到 localStorage
        try {
            localStorage.setItem('user', JSON.stringify(S.u));
        } catch (e) {
            console.warn('无法保存用户信息到本地存储:', e);
        }
        
        // 关闭模态框
        document.getElementById('modal-email-login').style.display = 'none';
        msg('邮箱登录成功！');
        
        // 跳转到主页
        setTimeout(() => {
            nav('home');
        }, 500);
    }
    
    function loginPhone() {
        // 显示手机号登录模态框
        document.getElementById('modal-phone-login').style.display = 'flex';
        // 清空输入框
        document.getElementById('phone-input').value = '';
        document.getElementById('phone-name').value = '';
        // 聚焦到手机号输入框
        setTimeout(() => {
            document.getElementById('phone-input').focus();
        }, 100);
    }
    
    function submitPhoneLogin() {
        const phone = document.getElementById('phone-input').value.trim();
        const name = document.getElementById('phone-name').value.trim();
        
        if (!phone) {
            msg('请输入手机号码');
            return;
        }
        
        // 简单的手机号格式验证（支持国际格式）
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(phone) || phone.replace(/\D/g, '').length < 7) {
            msg('请输入有效的手机号码');
            return;
        }
        
        // 保存用户信息
        const userName = name || '用户' + phone.slice(-4);
        S.u = {
            name: userName,
            email: '',
            phone: phone,
            avatar: ''
        };
        
        // 保存到 localStorage
        try {
            localStorage.setItem('user', JSON.stringify(S.u));
        } catch (e) {
            console.warn('无法保存用户信息到本地存储:', e);
        }
        
        // 关闭模态框
        document.getElementById('modal-phone-login').style.display = 'none';
        msg('手机号登录成功！');
        
        // 跳转到主页
        setTimeout(() => {
            nav('home');
        }, 500);
    }
    function editSecurityText() {
        const currentText = document.querySelector('.register-security').textContent.replace('🔒 ', '');
        const newText = prompt('编辑安全提示文字:', currentText);
        if (newText !== null && newText.trim() !== '') {
            document.querySelector('.register-security').textContent = '🔒 ' + newText;
            msg('安全提示已更新');
        }
    }
    let tm; function msg(t) { const o = document.getElementById('toast'); o.textContent = t; o.style.opacity = 1; clearTimeout(tm); tm = setTimeout(() => o.style.opacity = 0, 3000); }
    // 打开中奖信息模态框
    let confettiInterval = null;
    function openWinNoticeModal() {
        const modal = document.getElementById('modal-win-notice');
        const scrollEl = document.getElementById('win-notice-modal-scroll');
        const canvas = document.getElementById('win-notice-confetti-canvas');
        if (!modal || !scrollEl) return;
        
        // 获取所有中奖记录
        const winRecords = (S.rec.l || []).filter(r => r.w === true);
        const englishNames = ['John', 'Mike', 'David', 'Tom', 'James', 'Robert', 'William', 'Richard', 'Charles', 'Daniel', 'Matthew', 'Anthony', 'Mark', 'Donald', 'Steven', 'Paul', 'Andrew', 'Joshua', 'Kenneth', 'Kevin'];
        const mockProducts = ['iPhone 15 Pro', 'MacBook Pro', 'iPad', 'AirPods', 'Apple Watch', 'AirPods Pro', 'iPhone 14', 'MacBook Air', 'iPhone 13', 'iPad Pro', 'MacBook Air', 'iMac'];
        
        let notices = [];
        
        // 如果有真实中奖记录，使用真实数据
        if (winRecords.length > 0) {
            winRecords.forEach(r => {
                const userName = S.u && S.u.name ? S.u.name : englishNames[Math.floor(Math.random() * englishNames.length)];
                const userId = S.u ? (S.u.phone || S.u.email || 'ID' + Math.floor(Math.random() * 1000)) : 'ID' + Math.floor(Math.random() * 1000);
                const productName = S.activeItem ? S.activeItem.n : (mockProducts[Math.floor(Math.random() * mockProducts.length)]);
                notices.push(`${userName}(${userId})购买${productName}中奖`);
            });
        }
        
        // 添加模拟数据以填充分量
        while (notices.length < 20) {
            const name = englishNames[Math.floor(Math.random() * englishNames.length)];
            const id = 'ID' + (1000 + Math.floor(Math.random() * 9000));
            const product = mockProducts[Math.floor(Math.random() * mockProducts.length)];
            notices.push(`${name}(${id})购买${product}中奖`);
        }
        
        // 生成HTML，复制一份以实现无缝循环
        let html = '';
        notices.forEach(notice => {
            html += `<div class="win-notice-modal-item">${notice}</div>`;
        });
        // 复制一份以实现无缝循环
        html += html;
        
        scrollEl.innerHTML = `<div class="win-notice-modal-scroll-content">${html}</div>`;
        modal.style.display = 'flex';
        
        // 立即设置canvas尺寸并启动烟花效果
        if (canvas) {
            const mBox = modal.querySelector('.m-box');
            if (mBox) {
                const rect = mBox.getBoundingClientRect();
                canvas.width = rect.width;
                canvas.height = rect.height;
            }
        }
        
        // 立即启动连续的烟花效果
        if (window.confetti && canvas) {
            // 清除之前的定时器
            if (confettiInterval) {
                clearInterval(confettiInterval);
            }
            
            // 创建自定义confetti实例，绑定到我们的canvas
            const confettiInstance = confetti.create(canvas, {
                resize: true,
                useWorker: false
            });
            
                // 定义5个发射点：上边一个，下面两个，中间两个，不同高度
                const launchPoints = [
                    { x: 0.5, y: 0.2 },      // 上边中心
                    { x: 0.3, y: 0.7 },      // 下面左侧
                    { x: 0.7, y: 0.8 },      // 下面右侧
                    { x: 0.2, y: 0.5 },      // 中间左侧
                    { x: 0.8, y: 0.4 }       // 中间右侧
                ];
                
                // 随机打乱发射点顺序的函数
                function shuffleArray(array) {
                    const shuffled = [...array];
                    for (let i = shuffled.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
                    }
                    return shuffled;
                }
                
                // 立即触发第一轮随机烟花
                const firstRound = shuffleArray(launchPoints);
                firstRound.forEach((point, index) => {
                    setTimeout(() => {
                        confettiInstance({
                            particleCount: 25,
                            spread: 55,
                            origin: { x: point.x, y: point.y },
                            colors: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#FFC107'],
                            startVelocity: 18 + Math.random() * 4,  // 随机速度
                            gravity: 0.5,
                            ticks: 100,
                            scalar: 1.0
                        });
                    }, index * 150);
                });
                
                // 每1000ms触发一轮随机多点烟花效果
                confettiInterval = setInterval(() => {
                    const mBox = modal.querySelector('.m-box');
                    if (!mBox || modal.style.display === 'none') {
                        clearInterval(confettiInterval);
                        return;
                    }
                    
                    // 随机打乱发射点顺序
                    const shuffledPoints = shuffleArray(launchPoints);
                    
                    // 随机触发烟花（每次随机选择3-5个点）
                    const count = 3 + Math.floor(Math.random() * 3); // 3-5个点
                    const selectedPoints = shuffledPoints.slice(0, count);
                    
                    selectedPoints.forEach((point, index) => {
                        setTimeout(() => {
                            confettiInstance({
                                particleCount: 25,
                                spread: 55,
                                origin: { x: point.x, y: point.y },
                                colors: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#FFC107'],
                                startVelocity: 18 + Math.random() * 4,  // 随机速度
                                gravity: 0.5,
                                ticks: 100,
                                scalar: 1.0
                            });
                        }, index * 150);
                    });
                }, 1000);
        }
    }
    
    // 关闭中奖信息模态框
    function closeWinNoticeModal() {
        const modal = document.getElementById('modal-win-notice');
        if (modal) {
            modal.style.display = 'none';
            // 停止烟花效果
            if (confettiInterval) {
                clearInterval(confettiInterval);
                confettiInterval = null;
            }
            // 清除canvas
            const canvas = document.getElementById('win-notice-confetti-canvas');
            if (canvas) {
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                }
            }
        }
    }
    
    // ========== 打砖块游戏 (Breakout) ==========
    // Based on MIT licensed Breakout games from GitHub
    let breakoutGame = {
        canvas: null,
        ctx: null,
        paddle: {x: 0, y: 0, width: 100, height: 15},
        balls: [], // 支持多球
        bricks: [],
        level: 1,
        score: 0,
        lives: 3,
        remainingBricks: 0,
        gameLoop: null,
        keys: {},
        started: false,
        isDragging: false,
        lastTouchX: 0,
        powerUps: [], // 道具系统
        combo: 0, // 连击计数
        lastHitTime: 0
    };

    function openBreakoutGame() {
        document.getElementById('modal-breakout-game').style.display = 'flex';
        setTimeout(() => {
            breakoutGame.canvas = document.getElementById('breakout-canvas');
            const maxWidth = Math.min(window.innerWidth * 0.9, 800);
            const maxHeight = Math.min(window.innerHeight * 0.6, 600);
            breakoutGame.canvas.width = maxWidth;
            breakoutGame.canvas.height = maxHeight;
            breakoutGame.canvas.style.width = maxWidth + 'px';
            breakoutGame.canvas.style.height = maxHeight + 'px';
            breakoutGame.ctx = breakoutGame.canvas.getContext('2d');
            breakoutRestart();
        }, 100);
    }

    function closeBreakoutGame() {
        document.getElementById('modal-breakout-game').style.display = 'none';
        if (breakoutGame.gameLoop) {
            cancelAnimationFrame(breakoutGame.gameLoop);
            breakoutGame.gameLoop = null;
        }
        document.removeEventListener('keydown', handleBreakoutKey);
        document.removeEventListener('keyup', handleBreakoutKeyUp);
    }

    function breakoutRestart() {
        if (!breakoutGame.canvas || !breakoutGame.ctx) return;
        breakoutGame.paddle.x = breakoutGame.canvas.width / 2 - breakoutGame.paddle.width / 2;
        breakoutGame.paddle.y = breakoutGame.canvas.height - 40;
        breakoutGame.paddle.width = 100; // 重置挡板宽度
        // 初始化单个球
        breakoutGame.balls = [{
            x: breakoutGame.canvas.width / 2,
            y: breakoutGame.canvas.height - 60,
            radius: 8,
            vx: 0,
            vy: 0,
            speed: 5 + breakoutGame.level * 0.3
        }];
        // 只在第一次启动时重置关卡和分数
        if (typeof breakoutGame.level === 'undefined' || breakoutGame.level === 0) {
            breakoutGame.level = 1;
            breakoutGame.score = 0;
        }
        breakoutGame.lives = 3;
        breakoutGame.started = false;
        breakoutGame.isDragging = false;
        breakoutGame.lastTouchX = 0;
        breakoutGame.powerUps = [];
        breakoutGame.combo = 0;
        breakoutInitBricks();
        updateBreakoutUI();
        if (breakoutGame.gameLoop) cancelAnimationFrame(breakoutGame.gameLoop);
        breakoutGame.gameLoop = requestAnimationFrame(breakoutGameStep);
        
        // 添加触摸和鼠标事件
        breakoutGame.canvas.addEventListener('touchstart', handleBreakoutTouchStart, {passive: false});
        breakoutGame.canvas.addEventListener('touchmove', handleBreakoutTouchMove, {passive: false});
        breakoutGame.canvas.addEventListener('touchend', handleBreakoutTouchEnd);
        breakoutGame.canvas.addEventListener('mousedown', handleBreakoutMouseDown);
        breakoutGame.canvas.addEventListener('mousemove', handleBreakoutMouseMove);
        breakoutGame.canvas.addEventListener('mouseup', handleBreakoutMouseUp);
        breakoutGame.canvas.addEventListener('click', handleBreakoutClick);
    }

    function handleBreakoutTouchStart(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = breakoutGame.canvas.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        breakoutGame.isDragging = true;
        breakoutGame.lastTouchX = x;
        if (!breakoutGame.started) {
            breakoutStart();
        }
    }

    function handleBreakoutTouchMove(e) {
        e.preventDefault();
        if (!breakoutGame.isDragging) return;
        const touch = e.touches[0];
        const rect = breakoutGame.canvas.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const deltaX = x - breakoutGame.lastTouchX;
        breakoutGame.paddle.x = Math.max(0, Math.min(breakoutGame.canvas.width - breakoutGame.paddle.width, breakoutGame.paddle.x + deltaX));
        if (!breakoutGame.started) {
            breakoutGame.ball.x = breakoutGame.paddle.x + breakoutGame.paddle.width / 2;
        }
        breakoutGame.lastTouchX = x;
    }

    function handleBreakoutTouchEnd(e) {
        breakoutGame.isDragging = false;
    }

    function handleBreakoutMouseDown(e) {
        const rect = breakoutGame.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        breakoutGame.isDragging = true;
        breakoutGame.lastTouchX = x;
        if (!breakoutGame.started) {
            breakoutStart();
        }
    }

    function handleBreakoutMouseMove(e) {
        if (!breakoutGame.isDragging) return;
        const rect = breakoutGame.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const deltaX = x - breakoutGame.lastTouchX;
        breakoutGame.paddle.x = Math.max(0, Math.min(breakoutGame.canvas.width - breakoutGame.paddle.width, breakoutGame.paddle.x + deltaX));
        if (!breakoutGame.started) {
            breakoutGame.ball.x = breakoutGame.paddle.x + breakoutGame.paddle.width / 2;
        }
        breakoutGame.lastTouchX = x;
    }

    function handleBreakoutMouseUp(e) {
        breakoutGame.isDragging = false;
    }

    function handleBreakoutClick(e) {
        if (!breakoutGame.started) {
            breakoutStart();
        }
    }

    function breakoutStart() {
        if (breakoutGame.started) return;
        breakoutGame.started = true;
        const ball = breakoutGame.balls[0];
        const angle = (Math.random() - 0.5) * Math.PI / 3;
        ball.vx = Math.sin(angle) * ball.speed;
        ball.vy = -Math.cos(angle) * ball.speed;
    }
    
    // 生成道具
    function spawnPowerUp(x, y, type) {
        breakoutGame.powerUps.push({
            x: x,
            y: y,
            width: 30,
            height: 15,
            type: type,
            speed: 2
        });
    }
    
    // 应用道具效果
    function applyPowerUp(type) {
        switch(type) {
            case 'split': // 球分裂
                const newBalls = [];
                breakoutGame.balls.forEach(ball => {
                    if (breakoutGame.balls.length + newBalls.length < 8) {
                        newBalls.push({
                            x: ball.x,
                            y: ball.y,
                            radius: ball.radius,
                            vx: ball.vx * Math.cos(0.3) - ball.vy * Math.sin(0.3),
                            vy: ball.vx * Math.sin(0.3) + ball.vy * Math.cos(0.3),
                            speed: ball.speed
                        });
                        newBalls.push({
                            x: ball.x,
                            y: ball.y,
                            radius: ball.radius,
                            vx: ball.vx * Math.cos(-0.3) - ball.vy * Math.sin(-0.3),
                            vy: ball.vx * Math.sin(-0.3) + ball.vy * Math.cos(-0.3),
                            speed: ball.speed
                        });
                    }
                });
                breakoutGame.balls = breakoutGame.balls.concat(newBalls);
                break;
            case 'expand': // 挡板变长
                breakoutGame.paddle.width = Math.min(breakoutGame.paddle.width + 30, 180);
                break;
            case 'shrink': // 挡板变短
                breakoutGame.paddle.width = Math.max(breakoutGame.paddle.width - 20, 50);
                break;
            case 'fast': // 球加速
                breakoutGame.balls.forEach(ball => {
                    ball.speed = Math.min(ball.speed * 1.3, 12);
                    const currentSpeed = Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy);
                    if (currentSpeed > 0) {
                        ball.vx = ball.vx / currentSpeed * ball.speed;
                        ball.vy = ball.vy / currentSpeed * ball.speed;
                    }
                });
                break;
            case 'slow': // 球减速
                breakoutGame.balls.forEach(ball => {
                    ball.speed = Math.max(ball.speed * 0.7, 3);
                    const currentSpeed = Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy);
                    if (currentSpeed > 0) {
                        ball.vx = ball.vx / currentSpeed * ball.speed;
                        ball.vy = ball.vy / currentSpeed * ball.speed;
                    }
                });
                break;
            case 'extra': // 额外生命
                breakoutGame.lives++;
                break;
        }
    }

    function breakoutInitBricks() {
        breakoutGame.bricks = [];
        const rows = Math.min(5 + Math.floor(breakoutGame.level / 2), 10);
        const cols = 8;
        const brickWidth = (breakoutGame.canvas.width - 40) / cols - 5;
        const brickHeight = 25;
        const startY = 50;
        
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                // 根据关卡决定砖块硬度
                let hp = 1;
                let color = `hsl(${(row * 30) % 360}, 70%, 50%)`;
                let powerUp = null;
                
                // 高关卡增加硬砖块
                if (breakoutGame.level >= 3) {
                    const hardChance = Math.min(0.1 + breakoutGame.level * 0.05, 0.5);
                    if (Math.random() < hardChance) {
                        hp = Math.min(2 + Math.floor(breakoutGame.level / 3), 5);
                        color = `hsl(0, 0%, ${80 - hp * 15}%)`; // 灰色表示硬度
                    }
                }
                
                // 随机添加道具砖块
                if (Math.random() < 0.08) {
                    const powerTypes = ['split', 'expand', 'shrink', 'fast', 'slow', 'extra'];
                    powerUp = powerTypes[Math.floor(Math.random() * powerTypes.length)];
                    color = powerUp === 'split' ? '#FF00FF' : 
                            powerUp === 'expand' ? '#00FFFF' : 
                            powerUp === 'shrink' ? '#FF0000' :
                            powerUp === 'fast' ? '#FFFF00' :
                            powerUp === 'slow' ? '#00FF00' : '#FFD700';
                }
                
                breakoutGame.bricks.push({
                    x: 20 + col * (brickWidth + 5),
                    y: startY + row * (brickHeight + 5),
                    width: brickWidth,
                    height: brickHeight,
                    color: color,
                    originalColor: color,
                    hp: hp,
                    maxHp: hp,
                    hit: false,
                    powerUp: powerUp
                });
            }
        }
        breakoutGame.remainingBricks = breakoutGame.bricks.length;
    }


    function breakoutGameStep() {
        if (!breakoutGame.canvas || !breakoutGame.ctx) return;
        
        if (breakoutGame.started) {
            // 更新所有球的位置
            const ballsToRemove = [];
            
            breakoutGame.balls.forEach((ball, ballIndex) => {
                ball.x += ball.vx;
                ball.y += ball.vy;
                
                // 球与墙壁碰撞
                if (ball.x - ball.radius <= 0 || ball.x + ball.radius >= breakoutGame.canvas.width) {
                    ball.vx = -ball.vx;
                    ball.x = Math.max(ball.radius, Math.min(breakoutGame.canvas.width - ball.radius, ball.x));
                }
                if (ball.y - ball.radius <= 0) {
                    ball.vy = -ball.vy;
                    ball.y = ball.radius;
                }
                
                // 球与挡板碰撞
                if (ball.y + ball.radius >= breakoutGame.paddle.y &&
                    ball.y - ball.radius <= breakoutGame.paddle.y + breakoutGame.paddle.height &&
                    ball.x >= breakoutGame.paddle.x &&
                    ball.x <= breakoutGame.paddle.x + breakoutGame.paddle.width) {
                    const hitPos = (ball.x - breakoutGame.paddle.x) / breakoutGame.paddle.width;
                    const angle = (hitPos - 0.5) * Math.PI / 3;
                    ball.vx = Math.sin(angle) * ball.speed;
                    ball.vy = -Math.abs(Math.cos(angle) * ball.speed);
                    ball.y = breakoutGame.paddle.y - ball.radius;
                }
                
                // 球与砖块碰撞
                for (let brick of breakoutGame.bricks) {
                    if (!brick.hit &&
                        ball.x + ball.radius >= brick.x &&
                        ball.x - ball.radius <= brick.x + brick.width &&
                        ball.y + ball.radius >= brick.y &&
                        ball.y - ball.radius <= brick.y + brick.height) {
                        
                        brick.hp--;
                        
                        // 连击系统
                        const now = Date.now();
                        if (now - breakoutGame.lastHitTime < 500) {
                            breakoutGame.combo++;
                        } else {
                            breakoutGame.combo = 1;
                        }
                        breakoutGame.lastHitTime = now;
                        
                        // 更新砖块颜色显示剩余血量
                        if (brick.hp > 0) {
                            const brightness = 30 + (brick.hp / brick.maxHp) * 50;
                            brick.color = `hsl(0, 0%, ${brightness}%)`;
                        } else {
                            brick.hit = true;
                            breakoutGame.remainingBricks--;
                            
                            // 掉落道具
                            if (brick.powerUp) {
                                spawnPowerUp(brick.x + brick.width/2, brick.y + brick.height, brick.powerUp);
                            }
                        }
                        
                        // 分数计算（包含连击加成）
                        breakoutGame.score += 10 * brick.maxHp * (1 + breakoutGame.combo * 0.1);
                        
                        // 确定反弹方向
                        const dx = ball.x - (brick.x + brick.width / 2);
                        const dy = ball.y - (brick.y + brick.height / 2);
                        
                        if (Math.abs(dx / brick.width) > Math.abs(dy / brick.height)) {
                            ball.vx = -ball.vx;
                        } else {
                            ball.vy = -ball.vy;
                        }
                        
                        if (breakoutGame.remainingBricks === 0) {
                            breakoutLevelComplete();
                            return;
                        }
                        break;
                    }
                }
                
                // 球掉落
                if (ball.y > breakoutGame.canvas.height) {
                    ballsToRemove.push(ballIndex);
                }
            });
            
            // 移除掉落的球
            for (let i = ballsToRemove.length - 1; i >= 0; i--) {
                breakoutGame.balls.splice(ballsToRemove[i], 1);
            }
            
            // 如果没有球了
            if (breakoutGame.balls.length === 0) {
                breakoutGame.lives--;
                breakoutGame.combo = 0;
                if (breakoutGame.lives <= 0) {
                    breakoutGameOver();
                    return;
                }
                // 重新生成一个球
                breakoutGame.balls = [{
                    x: breakoutGame.canvas.width / 2,
                    y: breakoutGame.canvas.height - 60,
                    radius: 8,
                    vx: 0,
                    vy: 0,
                    speed: 5 + breakoutGame.level * 0.3
                }];
                breakoutGame.started = false;
            }
            
            // 更新道具
            breakoutGame.powerUps = breakoutGame.powerUps.filter(powerUp => {
                powerUp.y += powerUp.speed;
                
                // 检查与挡板碰撞
                if (powerUp.y + powerUp.height >= breakoutGame.paddle.y &&
                    powerUp.x + powerUp.width >= breakoutGame.paddle.x &&
                    powerUp.x <= breakoutGame.paddle.x + breakoutGame.paddle.width) {
                    applyPowerUp(powerUp.type);
                    return false;
                }
                
                return powerUp.y < breakoutGame.canvas.height;
            });
            
        } else {
            // 球跟随挡板
            if (breakoutGame.balls.length > 0) {
                breakoutGame.balls[0].x = breakoutGame.paddle.x + breakoutGame.paddle.width / 2;
            }
        }
        
        drawBreakout();
        updateBreakoutUI();
        breakoutGame.gameLoop = requestAnimationFrame(breakoutGameStep);
    }

    function drawBreakout() {
        if (!breakoutGame.canvas || !breakoutGame.ctx) return;
        const ctx = breakoutGame.ctx;
        
        // 清空画布
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--card-bg') || '#1A1D2E';
        ctx.fillRect(0, 0, breakoutGame.canvas.width, breakoutGame.canvas.height);
        
        // 绘制砖块
        breakoutGame.bricks.forEach(brick => {
            if (!brick.hit) {
                ctx.fillStyle = brick.color;
                ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
                
                // 显示血量（如果大于1）
                if (brick.hp > 1) {
                    ctx.fillStyle = '#FFFFFF';
                    ctx.font = 'bold 12px Arial';
                    ctx.textAlign = 'center';
                    ctx.fillText(brick.hp, brick.x + brick.width/2, brick.y + brick.height/2 + 4);
                }
                
                // 道具砖块特效
                if (brick.powerUp) {
                    ctx.strokeStyle = '#FFFFFF';
                    ctx.lineWidth = 2;
                    ctx.strokeRect(brick.x + 2, brick.y + 2, brick.width - 4, brick.height - 4);
                }
            }
        });
        
        // 绘制道具
        breakoutGame.powerUps.forEach(powerUp => {
            ctx.fillStyle = powerUp.type === 'split' ? '#FF00FF' : 
                            powerUp.type === 'expand' ? '#00FFFF' : 
                            powerUp.type === 'shrink' ? '#FF0000' :
                            powerUp.type === 'fast' ? '#FFFF00' :
                            powerUp.type === 'slow' ? '#00FF00' : '#FFD700';
            ctx.fillRect(powerUp.x - powerUp.width/2, powerUp.y, powerUp.width, powerUp.height);
            ctx.fillStyle = '#000';
            ctx.font = 'bold 10px Arial';
            ctx.textAlign = 'center';
            const label = powerUp.type === 'split' ? '分' : 
                          powerUp.type === 'expand' ? '大' : 
                          powerUp.type === 'shrink' ? '小' :
                          powerUp.type === 'fast' ? '快' :
                          powerUp.type === 'slow' ? '慢' : '+1';
            ctx.fillText(label, powerUp.x, powerUp.y + 11);
        });
        
        // 绘制挡板
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--primary') || '#FFC107';
        ctx.fillRect(breakoutGame.paddle.x, breakoutGame.paddle.y, breakoutGame.paddle.width, breakoutGame.paddle.height);
        
        // 绘制所有球
        breakoutGame.balls.forEach((ball, index) => {
            ctx.fillStyle = index === 0 ? '#FFFFFF' : `hsl(${index * 60}, 100%, 70%)`;
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
            ctx.fill();
        });
        
        // 显示连击
        if (breakoutGame.combo > 1) {
            ctx.fillStyle = '#FFD700';
            ctx.font = 'bold 20px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(`${breakoutGame.combo}连击!`, breakoutGame.canvas.width / 2, 30);
        }
        
        // 显示球数量
        if (breakoutGame.balls.length > 1) {
            ctx.fillStyle = '#00FF00';
            ctx.font = 'bold 14px Arial';
            ctx.textAlign = 'left';
            ctx.fillText(`球x${breakoutGame.balls.length}`, 10, breakoutGame.canvas.height - 10);
        }
    }

    function updateBreakoutUI() {
        const levelEl = document.getElementById('breakout-level');
        const scoreEl = document.getElementById('breakout-score');
        const livesEl = document.getElementById('breakout-lives');
        const bricksEl = document.getElementById('breakout-bricks');
        if (levelEl) levelEl.textContent = breakoutGame.level;
        if (scoreEl) scoreEl.textContent = breakoutGame.score;
        if (livesEl) livesEl.textContent = breakoutGame.lives;
        if (bricksEl) bricksEl.textContent = breakoutGame.remainingBricks;
    }

    function breakoutLevelComplete() {
        cancelAnimationFrame(breakoutGame.gameLoop);
        
        let reward = 10;
        // 扩展到25关
        if (breakoutGame.level <= 3) {
            reward = 10 + (breakoutGame.level - 1) * 10;
        } else if (breakoutGame.level <= 6) {
            reward = 50 + (breakoutGame.level - 4) * 15;
        } else if (breakoutGame.level <= 10) {
            reward = 100 + (breakoutGame.level - 7) * 25;
        } else if (breakoutGame.level <= 15) {
            reward = 200 + (breakoutGame.level - 11) * 40;
        } else if (breakoutGame.level <= 20) {
            reward = 400 + (breakoutGame.level - 16) * 50;
        } else {
            reward = 650 + (breakoutGame.level - 21) * 70;
        }
        
        // 连击加成
        if (breakoutGame.combo > 5) {
            reward += Math.floor(breakoutGame.combo * 5);
        }
        
        // 通过第25关获得1000积分
        if (breakoutGame.level === 25) {
            reward = 1000;
            S.pts += reward;
            upd();
            msg(`恭喜通关！完成所有25关！获得${reward}积分！`);
            // 重置关卡以便重新开始
            breakoutGame.level = 0;
            breakoutGame.score = 0;
            setTimeout(() => {
                breakoutRestart();
            }, 2000);
            return;
        }
        
        S.pts += reward;
        upd();
        msg(`恭喜通过第${breakoutGame.level}关！获得${reward}积分！`);
        
        // 递增关卡
        breakoutGame.level++;
        
        setTimeout(() => {
            breakoutRestart();
        }, 1000);
    }

    function breakoutGameOver() {
        cancelAnimationFrame(breakoutGame.gameLoop);
        msg('游戏结束！');
    }

    // ========== 太空射击游戏 (Space Shooter) ==========
    // Based on MIT licensed space shooter games from GitHub
    let spaceShooterGame = {
        canvas: null,
        ctx: null,
        player: {x: 0, y: 0, width: 50, height: 40, fireRate: 150, bulletDamage: 1, bulletCount: 1},
        bullets: [],
        enemies: [],
        enemyBullets: [], // 敌人子弹
        particles: [],
        powerUps: [], // 道具
        level: 1,
        score: 0,
        lives: 3,
        targetKills: 30,
        kills: 0,
        gameLoop: null,
        lastShot: 0,
        enemySpawnTimer: 0,
        mouseX: 0,
        mouseY: 0,
        isShooting: false,
        boss: null, // Boss
        bossSpawned: false,
        shieldActive: false,
        shieldTimer: 0
    };

    function openSpaceShooterGame() {
        document.getElementById('modal-space-shooter-game').style.display = 'flex';
        setTimeout(() => {
            spaceShooterGame.canvas = document.getElementById('space-shooter-canvas');
            const maxWidth = Math.min(window.innerWidth * 0.9, 800);
            const maxHeight = Math.min(window.innerHeight * 0.6, 600);
            spaceShooterGame.canvas.width = maxWidth;
            spaceShooterGame.canvas.height = maxHeight;
            spaceShooterGame.canvas.style.width = maxWidth + 'px';
            spaceShooterGame.canvas.style.height = maxHeight + 'px';
            spaceShooterGame.ctx = spaceShooterGame.canvas.getContext('2d');
            spaceShooterRestart();
        }, 100);
    }

    function closeSpaceShooterGame() {
        document.getElementById('modal-space-shooter-game').style.display = 'none';
        if (spaceShooterGame.gameLoop) {
            cancelAnimationFrame(spaceShooterGame.gameLoop);
            spaceShooterGame.gameLoop = null;
        }
        spaceShooterGame.canvas.removeEventListener('touchstart', handleSpaceShooterTouchStart);
        spaceShooterGame.canvas.removeEventListener('touchmove', handleSpaceShooterTouchMove);
        spaceShooterGame.canvas.removeEventListener('touchend', handleSpaceShooterTouchEnd);
        spaceShooterGame.canvas.removeEventListener('mousemove', handleSpaceShooterMouseMove);
        spaceShooterGame.canvas.removeEventListener('mousedown', handleSpaceShooterMouseDown);
        spaceShooterGame.canvas.removeEventListener('mouseup', handleSpaceShooterMouseUp);
    }

    function spaceShooterRestart() {
        if (!spaceShooterGame.canvas || !spaceShooterGame.ctx) return;
        spaceShooterGame.player.x = spaceShooterGame.canvas.width / 2 - spaceShooterGame.player.width / 2;
        spaceShooterGame.player.y = spaceShooterGame.canvas.height - spaceShooterGame.player.height - 20;
        spaceShooterGame.player.fireRate = 150;
        spaceShooterGame.player.bulletDamage = 1;
        spaceShooterGame.player.bulletCount = 1;
        spaceShooterGame.bullets = [];
        spaceShooterGame.enemies = [];
        spaceShooterGame.enemyBullets = [];
        spaceShooterGame.particles = [];
        spaceShooterGame.powerUps = [];
        spaceShooterGame.boss = null;
        spaceShooterGame.bossSpawned = false;
        spaceShooterGame.shieldActive = false;
        spaceShooterGame.shieldTimer = 0;
        // 只在第一次启动时重置关卡和分数
        if (typeof spaceShooterGame.level === 'undefined' || spaceShooterGame.level === 0) {
            spaceShooterGame.level = 1;
            spaceShooterGame.score = 0;
        }
        spaceShooterGame.lives = 3;
        spaceShooterGame.targetKills = 20 + (spaceShooterGame.level - 1) * 8;
        spaceShooterGame.kills = 0;
        spaceShooterGame.isShooting = false;
        spaceShooterGame.lastShot = 0;
        spaceShooterGame.enemySpawnTimer = 0;
        updateSpaceShooterUI();
        if (spaceShooterGame.gameLoop) cancelAnimationFrame(spaceShooterGame.gameLoop);
        spaceShooterGame.gameLoop = requestAnimationFrame(spaceShooterGameStep);
        
        // 添加触摸和鼠标事件
        spaceShooterGame.canvas.addEventListener('touchstart', handleSpaceShooterTouchStart, {passive: false});
        spaceShooterGame.canvas.addEventListener('touchmove', handleSpaceShooterTouchMove, {passive: false});
        spaceShooterGame.canvas.addEventListener('touchend', handleSpaceShooterTouchEnd);
        spaceShooterGame.canvas.addEventListener('mousemove', handleSpaceShooterMouseMove);
        spaceShooterGame.canvas.addEventListener('mousedown', handleSpaceShooterMouseDown);
        spaceShooterGame.canvas.addEventListener('mouseup', handleSpaceShooterMouseUp);
    }

    function handleSpaceShooterTouchStart(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = spaceShooterGame.canvas.getBoundingClientRect();
        spaceShooterGame.mouseX = touch.clientX - rect.left;
        spaceShooterGame.mouseY = touch.clientY - rect.top;
        spaceShooterGame.isShooting = true;
    }

    function handleSpaceShooterTouchMove(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = spaceShooterGame.canvas.getBoundingClientRect();
        spaceShooterGame.mouseX = touch.clientX - rect.left;
        spaceShooterGame.mouseY = touch.clientY - rect.top;
    }

    function handleSpaceShooterTouchEnd(e) {
        spaceShooterGame.isShooting = false;
    }

    function handleSpaceShooterMouseMove(e) {
        const rect = spaceShooterGame.canvas.getBoundingClientRect();
        spaceShooterGame.mouseX = e.clientX - rect.left;
        spaceShooterGame.mouseY = e.clientY - rect.top;
    }

    function handleSpaceShooterMouseDown(e) {
        spaceShooterGame.isShooting = true;
    }

    function handleSpaceShooterMouseUp(e) {
        spaceShooterGame.isShooting = false;
    }

    function spaceShooterGameStep() {
        if (!spaceShooterGame.canvas || !spaceShooterGame.ctx) return;
        
        // 移动玩家到鼠标/触摸位置
        const targetX = spaceShooterGame.mouseX - spaceShooterGame.player.width / 2;
        const targetY = spaceShooterGame.mouseY - spaceShooterGame.player.height / 2;
        spaceShooterGame.player.x += (targetX - spaceShooterGame.player.x) * 0.12;
        spaceShooterGame.player.y += (targetY - spaceShooterGame.player.y) * 0.12;
        spaceShooterGame.player.x = Math.max(0, Math.min(spaceShooterGame.canvas.width - spaceShooterGame.player.width, spaceShooterGame.player.x));
        spaceShooterGame.player.y = Math.max(0, Math.min(spaceShooterGame.canvas.height - spaceShooterGame.player.height, spaceShooterGame.player.y));
        
        // 护盾计时
        if (spaceShooterGame.shieldActive) {
            spaceShooterGame.shieldTimer--;
            if (spaceShooterGame.shieldTimer <= 0) {
                spaceShooterGame.shieldActive = false;
            }
        }
        
        // 连续射击
        if (spaceShooterGame.isShooting) {
            spaceShooterShoot();
        }
        
        // 生成敌人（多种类型）
        spaceShooterGame.enemySpawnTimer++;
        const spawnRate = Math.max(60 - spaceShooterGame.level * 4, 20);
        if (spaceShooterGame.enemySpawnTimer > spawnRate && !spaceShooterGame.boss) {
            spaceShooterGame.enemySpawnTimer = 0;
            spawnEnemy();
        }
        
        // Boss战（每5关出现）
        if (spaceShooterGame.kills >= spaceShooterGame.targetKills && !spaceShooterGame.bossSpawned && spaceShooterGame.level % 5 === 0) {
            spawnBoss();
        }
        
        // 更新子弹
        spaceShooterGame.bullets = spaceShooterGame.bullets.filter(bullet => {
            bullet.y -= bullet.speed;
            return bullet.y > -bullet.height;
        });
        
        // 更新敌人子弹
        spaceShooterGame.enemyBullets = spaceShooterGame.enemyBullets.filter(bullet => {
            bullet.y += bullet.speed;
            
            // 检查与玩家碰撞
            if (!spaceShooterGame.shieldActive &&
                bullet.x < spaceShooterGame.player.x + spaceShooterGame.player.width &&
                bullet.x + bullet.width > spaceShooterGame.player.x &&
                bullet.y < spaceShooterGame.player.y + spaceShooterGame.player.height &&
                bullet.y + bullet.height > spaceShooterGame.player.y) {
                if (spaceShooterGame.lives > 0) {
                    spaceShooterGame.lives--;
                    createSpaceShooterParticles(spaceShooterGame.player.x + spaceShooterGame.player.width/2, spaceShooterGame.player.y + spaceShooterGame.player.height/2);
                    if (spaceShooterGame.lives <= 0) {
                        spaceShooterGameOver();
                        return false;
                    }
                }
                return false;
            }
            
            return bullet.y < spaceShooterGame.canvas.height;
        });
        
        // 更新Boss
        if (spaceShooterGame.boss) {
            updateBoss();
        }
        
        // 更新敌人
        spaceShooterGame.enemies = spaceShooterGame.enemies.filter(enemy => {
            // 根据敌人类型移动
            if (enemy.type === 'zigzag') {
                enemy.x += Math.sin(enemy.y / 30) * 3;
            } else if (enemy.type === 'fast') {
                enemy.y += enemy.speed * 1.5;
            } else if (enemy.type === 'shooter') {
                enemy.shootTimer = (enemy.shootTimer || 0) + 1;
                if (enemy.shootTimer > 80) {
                    enemy.shootTimer = 0;
                    spaceShooterGame.enemyBullets.push({
                        x: enemy.x + enemy.width/2 - 3,
                        y: enemy.y + enemy.height,
                        width: 6,
                        height: 12,
                        speed: 4
                    });
                }
            }
            enemy.y += enemy.speed;
            
            // 检查与子弹碰撞
            for (let i = spaceShooterGame.bullets.length - 1; i >= 0; i--) {
                const bullet = spaceShooterGame.bullets[i];
                if (bullet.x < enemy.x + enemy.width && bullet.x + bullet.width > enemy.x &&
                    bullet.y < enemy.y + enemy.height && bullet.y + bullet.height > enemy.y) {
                    spaceShooterGame.bullets.splice(i, 1);
                    enemy.hp -= spaceShooterGame.player.bulletDamage;
                    
                    if (enemy.hp <= 0) {
                        spaceShooterGame.score += enemy.points || 10;
                        spaceShooterGame.kills++;
                        createSpaceShooterParticles(enemy.x + enemy.width/2, enemy.y + enemy.height/2);
                        
                        // 随机掉落道具
                        if (Math.random() < 0.15) {
                            spawnSpaceShooterPowerUp(enemy.x + enemy.width/2, enemy.y + enemy.height/2);
                        }
                        return false;
                    }
                    break;
                }
            }
            
            // 检查与玩家碰撞
            if (!spaceShooterGame.shieldActive &&
                enemy.x < spaceShooterGame.player.x + spaceShooterGame.player.width &&
                enemy.x + enemy.width > spaceShooterGame.player.x &&
                enemy.y < spaceShooterGame.player.y + spaceShooterGame.player.height &&
                enemy.y + enemy.height > spaceShooterGame.player.y) {
                if (spaceShooterGame.lives > 0) {
                    spaceShooterGame.lives--;
                    createSpaceShooterParticles(spaceShooterGame.player.x + spaceShooterGame.player.width/2, spaceShooterGame.player.y + spaceShooterGame.player.height/2);
                    if (spaceShooterGame.lives <= 0) {
                        spaceShooterGameOver();
                        return false;
                    }
                }
                return false;
            }
            
            return enemy.y < spaceShooterGame.canvas.height;
        });
        
        // 更新道具
        spaceShooterGame.powerUps = spaceShooterGame.powerUps.filter(powerUp => {
            powerUp.y += 2;
            
            // 检查与玩家碰撞
            if (powerUp.x < spaceShooterGame.player.x + spaceShooterGame.player.width &&
                powerUp.x + powerUp.width > spaceShooterGame.player.x &&
                powerUp.y < spaceShooterGame.player.y + spaceShooterGame.player.height &&
                powerUp.y + powerUp.height > spaceShooterGame.player.y) {
                applySpaceShooterPowerUp(powerUp.type);
                return false;
            }
            
            return powerUp.y < spaceShooterGame.canvas.height;
        });
        
        // 更新粒子
        spaceShooterGame.particles = spaceShooterGame.particles.filter(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.life--;
            return p.life > 0;
        });
        
        // 检查关卡完成
        if (spaceShooterGame.kills >= spaceShooterGame.targetKills && !spaceShooterGame.boss) {
            if (spaceShooterGame.level % 5 !== 0 || spaceShooterGame.bossSpawned) {
                spaceShooterLevelComplete();
                return;
            }
        }
        
        drawSpaceShooter();
        updateSpaceShooterUI();
        spaceShooterGame.gameLoop = requestAnimationFrame(spaceShooterGameStep);
    }
    
    // 生成敌人
    function spawnEnemy() {
        const types = ['normal', 'fast', 'zigzag'];
        if (spaceShooterGame.level >= 3) types.push('shooter');
        if (spaceShooterGame.level >= 5) types.push('tank');
        
        const type = types[Math.floor(Math.random() * types.length)];
        let enemy = {
            x: Math.random() * (spaceShooterGame.canvas.width - 40),
            y: -40,
            width: 40,
            height: 40,
            speed: 2 + spaceShooterGame.level * 0.2,
            type: type,
            hp: 1,
            points: 10
        };
        
        if (type === 'fast') {
            enemy.width = 30;
            enemy.height = 30;
            enemy.speed *= 1.5;
            enemy.points = 15;
        } else if (type === 'tank') {
            enemy.width = 50;
            enemy.height = 50;
            enemy.hp = 3 + Math.floor(spaceShooterGame.level / 3);
            enemy.speed *= 0.6;
            enemy.points = 30;
        } else if (type === 'shooter') {
            enemy.hp = 2;
            enemy.points = 25;
            enemy.shootTimer = 0;
        }
        
        spaceShooterGame.enemies.push(enemy);
    }
    
    // 生成Boss
    function spawnBoss() {
        spaceShooterGame.bossSpawned = true;
        spaceShooterGame.boss = {
            x: spaceShooterGame.canvas.width / 2 - 60,
            y: -120,
            width: 120,
            height: 100,
            hp: 50 + spaceShooterGame.level * 10,
            maxHp: 50 + spaceShooterGame.level * 10,
            speed: 1,
            direction: 1,
            shootTimer: 0,
            pattern: 0
        };
    }
    
    // 更新Boss
    function updateBoss() {
        const boss = spaceShooterGame.boss;
        
        // 进场动画
        if (boss.y < 30) {
            boss.y += 1;
            return;
        }
        
        // 左右移动
        boss.x += boss.speed * boss.direction;
        if (boss.x <= 10 || boss.x >= spaceShooterGame.canvas.width - boss.width - 10) {
            boss.direction *= -1;
        }
        
        // 射击
        boss.shootTimer++;
        if (boss.shootTimer > 30) {
            boss.shootTimer = 0;
            boss.pattern = (boss.pattern + 1) % 3;
            
            if (boss.pattern === 0) {
                // 单发
                spaceShooterGame.enemyBullets.push({
                    x: boss.x + boss.width/2 - 4,
                    y: boss.y + boss.height,
                    width: 8,
                    height: 16,
                    speed: 5
                });
            } else if (boss.pattern === 1) {
                // 三发扇形
                for (let i = -1; i <= 1; i++) {
                    spaceShooterGame.enemyBullets.push({
                        x: boss.x + boss.width/2 - 4 + i * 20,
                        y: boss.y + boss.height,
                        width: 8,
                        height: 16,
                        speed: 4,
                        vx: i * 1.5
                    });
                }
            } else {
                // 五发散射
                for (let i = -2; i <= 2; i++) {
                    spaceShooterGame.enemyBullets.push({
                        x: boss.x + boss.width/2 - 4,
                        y: boss.y + boss.height,
                        width: 6,
                        height: 12,
                        speed: 3,
                        vx: i * 2
                    });
                }
            }
        }
        
        // 更新敌人子弹（有横向移动）
        spaceShooterGame.enemyBullets.forEach(b => {
            if (b.vx) b.x += b.vx;
        });
        
        // 检查与子弹碰撞
        for (let i = spaceShooterGame.bullets.length - 1; i >= 0; i--) {
            const bullet = spaceShooterGame.bullets[i];
            if (bullet.x < boss.x + boss.width && bullet.x + bullet.width > boss.x &&
                bullet.y < boss.y + boss.height && bullet.y + bullet.height > boss.y) {
                spaceShooterGame.bullets.splice(i, 1);
                boss.hp -= spaceShooterGame.player.bulletDamage;
                
                if (boss.hp <= 0) {
                    spaceShooterGame.score += 500;
                    createSpaceShooterParticles(boss.x + boss.width/2, boss.y + boss.height/2);
                    createSpaceShooterParticles(boss.x + 20, boss.y + 20);
                    createSpaceShooterParticles(boss.x + boss.width - 20, boss.y + 20);
                    spaceShooterGame.boss = null;
                    spaceShooterLevelComplete();
                }
            }
        }
    }
    
    // 生成道具
    function spawnSpaceShooterPowerUp(x, y) {
        const types = ['spread', 'damage', 'speed', 'shield', 'life'];
        const type = types[Math.floor(Math.random() * types.length)];
        spaceShooterGame.powerUps.push({
            x: x - 12,
            y: y,
            width: 24,
            height: 24,
            type: type
        });
    }
    
    // 应用道具
    function applySpaceShooterPowerUp(type) {
        switch(type) {
            case 'spread':
                spaceShooterGame.player.bulletCount = Math.min(spaceShooterGame.player.bulletCount + 1, 5);
                break;
            case 'damage':
                spaceShooterGame.player.bulletDamage = Math.min(spaceShooterGame.player.bulletDamage + 1, 5);
                break;
            case 'speed':
                spaceShooterGame.player.fireRate = Math.max(spaceShooterGame.player.fireRate - 20, 50);
                break;
            case 'shield':
                spaceShooterGame.shieldActive = true;
                spaceShooterGame.shieldTimer = 300; // 5秒护盾
                break;
            case 'life':
                spaceShooterGame.lives++;
                break;
        }
    }

    function spaceShooterShoot() {
        const now = Date.now();
        if (now - spaceShooterGame.lastShot < spaceShooterGame.player.fireRate) return;
        spaceShooterGame.lastShot = now;
        
        const bulletCount = spaceShooterGame.player.bulletCount;
        const centerX = spaceShooterGame.player.x + spaceShooterGame.player.width / 2;
        
        for (let i = 0; i < bulletCount; i++) {
            const offset = (i - (bulletCount - 1) / 2) * 12;
            const angle = (i - (bulletCount - 1) / 2) * 0.1;
            spaceShooterGame.bullets.push({
                x: centerX - 4 + offset,
                y: spaceShooterGame.player.y,
                width: 8,
                height: 16,
                speed: 12,
                vx: Math.sin(angle) * 2
            });
        }
    }

    function createSpaceShooterParticles(x, y) {
        for (let i = 0; i < 10; i++) {
            spaceShooterGame.particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 5,
                vy: (Math.random() - 0.5) * 5,
                life: 25,
                size: Math.random() * 4 + 2
            });
        }
    }

    function drawSpaceShooter() {
        if (!spaceShooterGame.canvas || !spaceShooterGame.ctx) return;
        const ctx = spaceShooterGame.ctx;
        
        // 清空画布
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--card-bg') || '#1A1D2E';
        ctx.fillRect(0, 0, spaceShooterGame.canvas.width, spaceShooterGame.canvas.height);
        
        // 绘制玩家护盾
        if (spaceShooterGame.shieldActive) {
            ctx.strokeStyle = '#00FFFF';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(spaceShooterGame.player.x + spaceShooterGame.player.width/2, 
                    spaceShooterGame.player.y + spaceShooterGame.player.height/2, 
                    35, 0, Math.PI * 2);
            ctx.stroke();
        }
        
        // 绘制玩家
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--primary') || '#FFC107';
        ctx.fillRect(spaceShooterGame.player.x, spaceShooterGame.player.y, spaceShooterGame.player.width, spaceShooterGame.player.height);
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(spaceShooterGame.player.x + 10, spaceShooterGame.player.y + 10, 30, 20);
        
        // 绘制子弹
        ctx.fillStyle = '#00E676';
        spaceShooterGame.bullets.forEach(bullet => {
            if (bullet.vx) bullet.x += bullet.vx * 0.5;
            ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
        });
        
        // 绘制敌人子弹
        ctx.fillStyle = '#FF00FF';
        spaceShooterGame.enemyBullets.forEach(bullet => {
            ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
        });
        
        // 绘制敌人（根据类型不同颜色）
        spaceShooterGame.enemies.forEach(enemy => {
            if (enemy.type === 'fast') {
                ctx.fillStyle = '#FFFF00';
            } else if (enemy.type === 'tank') {
                ctx.fillStyle = '#888888';
            } else if (enemy.type === 'shooter') {
                ctx.fillStyle = '#FF00FF';
            } else if (enemy.type === 'zigzag') {
                ctx.fillStyle = '#00FFFF';
            } else {
                ctx.fillStyle = '#FF6B6B';
            }
            ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
            
            // 坦克敌人显示血量
            if (enemy.type === 'tank' && enemy.hp > 1) {
                ctx.fillStyle = '#FFFFFF';
                ctx.font = 'bold 14px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(enemy.hp, enemy.x + enemy.width/2, enemy.y + enemy.height/2 + 5);
            }
            
            ctx.fillStyle = '#FF0000';
            ctx.fillRect(enemy.x + 8, enemy.y + 8, enemy.width - 16, enemy.height - 16);
        });
        
        // 绘制Boss
        if (spaceShooterGame.boss) {
            const boss = spaceShooterGame.boss;
            // Boss身体
            ctx.fillStyle = '#8B0000';
            ctx.fillRect(boss.x, boss.y, boss.width, boss.height);
            ctx.fillStyle = '#FF4500';
            ctx.fillRect(boss.x + 10, boss.y + 10, boss.width - 20, boss.height - 20);
            
            // Boss血条
            ctx.fillStyle = '#333';
            ctx.fillRect(boss.x, boss.y - 15, boss.width, 10);
            ctx.fillStyle = '#FF0000';
            ctx.fillRect(boss.x, boss.y - 15, boss.width * (boss.hp / boss.maxHp), 10);
            
            // Boss标签
            ctx.fillStyle = '#FFFFFF';
            ctx.font = 'bold 12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('BOSS', boss.x + boss.width/2, boss.y - 20);
        }
        
        // 绘制道具
        spaceShooterGame.powerUps.forEach(powerUp => {
            ctx.fillStyle = powerUp.type === 'spread' ? '#00FF00' :
                            powerUp.type === 'damage' ? '#FF0000' :
                            powerUp.type === 'speed' ? '#FFFF00' :
                            powerUp.type === 'shield' ? '#00FFFF' : '#FFD700';
            ctx.beginPath();
            ctx.arc(powerUp.x + powerUp.width/2, powerUp.y + powerUp.height/2, 12, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#000';
            ctx.font = 'bold 10px Arial';
            ctx.textAlign = 'center';
            const label = powerUp.type === 'spread' ? 'S' :
                          powerUp.type === 'damage' ? 'D' :
                          powerUp.type === 'speed' ? 'F' :
                          powerUp.type === 'shield' ? '盾' : '+1';
            ctx.fillText(label, powerUp.x + powerUp.width/2, powerUp.y + powerUp.height/2 + 4);
        });
        
        // 绘制粒子
        spaceShooterGame.particles.forEach(p => {
            ctx.fillStyle = `rgba(255, ${255 - p.life * 8}, 0, ${p.life / 25})`;
            ctx.fillRect(p.x - p.size/2, p.y - p.size/2, p.size, p.size);
        });
        
        // 显示武器等级
        ctx.fillStyle = '#3CB371';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(`武器: Lv${spaceShooterGame.player.bulletCount} 伤害: ${spaceShooterGame.player.bulletDamage}`, 10, spaceShooterGame.canvas.height - 10);
    }

    function updateSpaceShooterUI() {
        const levelEl = document.getElementById('space-shooter-level');
        const scoreEl = document.getElementById('space-shooter-score');
        const livesEl = document.getElementById('space-shooter-lives');
        const targetEl = document.getElementById('space-shooter-target');
        if (levelEl) levelEl.textContent = spaceShooterGame.level;
        if (scoreEl) scoreEl.textContent = Math.floor(spaceShooterGame.score);
        if (livesEl) livesEl.textContent = Math.max(0, spaceShooterGame.lives);
        if (targetEl) {
            if (spaceShooterGame.boss) {
                targetEl.textContent = 'BOSS战!';
            } else {
                targetEl.textContent = `${spaceShooterGame.kills}/${spaceShooterGame.targetKills}`;
            }
        }
    }

    function spaceShooterLevelComplete() {
        cancelAnimationFrame(spaceShooterGame.gameLoop);
        
        let reward = 10;
        // 扩展到25关
        if (spaceShooterGame.level <= 3) {
            reward = 10 + (spaceShooterGame.level - 1) * 10;
        } else if (spaceShooterGame.level <= 6) {
            reward = 50 + (spaceShooterGame.level - 4) * 15;
        } else if (spaceShooterGame.level <= 10) {
            reward = 100 + (spaceShooterGame.level - 7) * 25;
        } else if (spaceShooterGame.level <= 15) {
            reward = 200 + (spaceShooterGame.level - 11) * 40;
        } else if (spaceShooterGame.level <= 20) {
            reward = 400 + (spaceShooterGame.level - 16) * 50;
        } else {
            reward = 650 + (spaceShooterGame.level - 21) * 70;
        }
        
        // Boss关卡额外奖励
        if (spaceShooterGame.level % 5 === 0) {
            reward += 200;
        }
        
        // 通过第25关获得1000积分
        if (spaceShooterGame.level === 25) {
            reward = 1000;
            S.pts += reward;
            upd();
            msg(`恭喜通关！完成所有25关！获得${reward}积分！`);
            // 重置关卡以便重新开始
            spaceShooterGame.level = 0;
            spaceShooterGame.score = 0;
            setTimeout(() => {
                spaceShooterRestart();
            }, 2000);
            return;
        }
        
        S.pts += reward;
        upd();
        const bossMsg = spaceShooterGame.level % 5 === 0 ? ' (Boss击败奖励!)' : '';
        msg(`恭喜通过第${spaceShooterGame.level}关！获得${reward}积分！${bossMsg}`);
        
        // 递增关卡
        spaceShooterGame.level++;
        spaceShooterGame.bossSpawned = false;
        spaceShooterGame.targetKills = 20 + (spaceShooterGame.level - 1) * 8;
        spaceShooterGame.kills = 0;
        
        setTimeout(() => {
            spaceShooterRestart();
        }, 1000);
    }

    function spaceShooterGameOver() {
        cancelAnimationFrame(spaceShooterGame.gameLoop);
        spaceShooterGame.lives = 0; // 确保不会出现负数
        updateSpaceShooterUI();
        
        // 显示游戏结束对话框
        const finalScore = Math.floor(spaceShooterGame.score);
        const finalLevel = spaceShooterGame.level;
        
        if (confirm(`游戏结束！\n\n最终关卡: 第${finalLevel}关\n最终得分: ${finalScore}\n\n是否重新开始？`)) {
            // 重新开始
            spaceShooterGame.level = 1;
            spaceShooterGame.score = 0;
            spaceShooterGame.lives = 3;
            spaceShooterGame.bossSpawned = false;
            spaceShooterRestart();
        } else {
            // 结束游戏，关闭窗口
            spaceShooterGame.level = 0;
            spaceShooterGame.score = 0;
            closeSpaceShooterGame();
        }
    }

    // ========== 消消乐游戏 (Match-3) ==========
    // Based on MIT licensed Match-3 games from GitHub
    let match3Game = {
        grid: [],
        gridSize: 8,
        selected: null,
        level: 1,
        score: 0,
        moves: 30,
        targetScore: 1000,
        colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F']
    };

    function openMatch3Game() {
        document.getElementById('modal-match3-game').style.display = 'flex';
        setTimeout(() => {
            match3Restart();
        }, 100);
    }

    function closeMatch3Game() {
        document.getElementById('modal-match3-game').style.display = 'none';
    }

    function match3Restart() {
        match3Game.level = 1;
        match3Game.score = 0;
        match3Game.moves = 30;
        match3Game.targetScore = 1000;
        match3Game.selected = null;
        match3InitGrid();
        match3Draw();
        updateMatch3UI();
    }

    function match3InitGrid() {
        match3Game.grid = [];
        for (let row = 0; row < match3Game.gridSize; row++) {
            match3Game.grid[row] = [];
            for (let col = 0; col < match3Game.gridSize; col++) {
                let color;
                do {
                    color = Math.floor(Math.random() * match3Game.colors.length);
                } while ((row >= 2 && match3Game.grid[row-1][col] === color && match3Game.grid[row-2][col] === color) ||
                         (col >= 2 && match3Game.grid[row][col-1] === color && match3Game.grid[row][col-2] === color));
                match3Game.grid[row][col] = color;
            }
        }
    }

    function match3Draw() {
        const gridEl = document.getElementById('match3-grid');
        if (!gridEl) return;
        gridEl.innerHTML = '';
        
        const bgColor = getComputedStyle(document.documentElement).getPropertyValue('--card-bg') || '#1A1D2E';
        
        for (let row = 0; row < match3Game.gridSize; row++) {
            for (let col = 0; col < match3Game.gridSize; col++) {
                const gem = document.createElement('div');
                const color = match3Game.colors[match3Game.grid[row][col]];
                const isSelected = match3Game.selected && match3Game.selected.row === row && match3Game.selected.col === col;
                
                gem.style.cssText = `
                    width: 100%;
                    aspect-ratio: 1;
                    background: ${color};
                    border-radius: 4px;
                    cursor: pointer;
                    border: ${isSelected ? '3px solid #FFC107' : '1px solid rgba(255,255,255,0.2)'};
                    transition: transform 0.1s;
                `;
                gem.onclick = () => match3Select(row, col);
                gem.onmouseenter = () => {
                    if (!isSelected) gem.style.transform = 'scale(1.1)';
                };
                gem.onmouseleave = () => {
                    gem.style.transform = 'scale(1)';
                };
                gridEl.appendChild(gem);
            }
        }
    }

    function match3Select(row, col) {
        if (match3Game.moves <= 0) return;
        
        if (!match3Game.selected) {
            match3Game.selected = {row, col};
            match3Draw();
        } else {
            const selected = match3Game.selected;
            const isAdjacent = (Math.abs(selected.row - row) === 1 && selected.col === col) ||
                             (Math.abs(selected.col - col) === 1 && selected.row === row);
            
            if (isAdjacent) {
                // 交换
                const temp = match3Game.grid[selected.row][selected.col];
                match3Game.grid[selected.row][selected.col] = match3Game.grid[row][col];
                match3Game.grid[row][col] = temp;
                
                // 检查是否有匹配
                const matches = match3FindMatches();
                if (matches.length > 0) {
                    match3Game.moves--;
                    match3RemoveMatches(matches);
                    match3FillGrid();
                    match3Draw();
                    updateMatch3UI();
                    
                    // 检查是否达到目标
                    if (match3Game.score >= match3Game.targetScore) {
                        match3LevelComplete();
                    } else if (match3Game.moves <= 0) {
                        msg('步数用尽！游戏结束！');
                    }
                } else {
                    // 没有匹配，交换回来
                    const temp = match3Game.grid[selected.row][selected.col];
                    match3Game.grid[selected.row][selected.col] = match3Game.grid[row][col];
                    match3Game.grid[row][col] = temp;
                }
            }
            match3Game.selected = null;
            match3Draw();
        }
    }

    function match3FindMatches() {
        const matches = [];
        const visited = Array(match3Game.gridSize).fill().map(() => Array(match3Game.gridSize).fill(false));
        
        // 检查水平匹配
        for (let row = 0; row < match3Game.gridSize; row++) {
            let count = 1;
            let color = match3Game.grid[row][0];
            for (let col = 1; col < match3Game.gridSize; col++) {
                if (match3Game.grid[row][col] === color) {
                    count++;
                } else {
                    if (count >= 3) {
                        for (let c = col - count; c < col; c++) {
                            if (!visited[row][c]) {
                                matches.push({row, col: c});
                                visited[row][c] = true;
                            }
                        }
                    }
                    count = 1;
                    color = match3Game.grid[row][col];
                }
            }
            if (count >= 3) {
                for (let c = match3Game.gridSize - count; c < match3Game.gridSize; c++) {
                    if (!visited[row][c]) {
                        matches.push({row, col: c});
                        visited[row][c] = true;
                    }
                }
            }
        }
        
        // 检查垂直匹配
        for (let col = 0; col < match3Game.gridSize; col++) {
            let count = 1;
            let color = match3Game.grid[0][col];
            for (let row = 1; row < match3Game.gridSize; row++) {
                if (match3Game.grid[row][col] === color) {
                    count++;
                } else {
                    if (count >= 3) {
                        for (let r = row - count; r < row; r++) {
                            if (!visited[r][col]) {
                                matches.push({row: r, col});
                                visited[r][col] = true;
                            }
                        }
                    }
                    count = 1;
                    color = match3Game.grid[row][col];
                }
            }
            if (count >= 3) {
                for (let r = match3Game.gridSize - count; r < match3Game.gridSize; r++) {
                    if (!visited[r][col]) {
                        matches.push({row: r, col});
                        visited[r][col] = true;
                    }
                }
            }
        }
        
        return matches;
    }

    function match3RemoveMatches(matches) {
        match3Game.score += matches.length * 10;
        matches.forEach(m => {
            match3Game.grid[m.row][m.col] = -1; // 标记为空
        });
    }

    function match3FillGrid() {
        // 下落
        for (let col = 0; col < match3Game.gridSize; col++) {
            let writePos = match3Game.gridSize - 1;
            for (let row = match3Game.gridSize - 1; row >= 0; row--) {
                if (match3Game.grid[row][col] !== -1) {
                    match3Game.grid[writePos][col] = match3Game.grid[row][col];
                    if (writePos !== row) match3Game.grid[row][col] = -1;
                    writePos--;
                }
            }
            // 填充新宝石
            for (let row = writePos; row >= 0; row--) {
                match3Game.grid[row][col] = Math.floor(Math.random() * match3Game.colors.length);
            }
        }
        
        // 再次检查匹配（级联）
        const newMatches = match3FindMatches();
        if (newMatches.length > 0) {
            match3RemoveMatches(newMatches);
            match3FillGrid();
        }
    }

    function updateMatch3UI() {
        const levelEl = document.getElementById('match3-level');
        const scoreEl = document.getElementById('match3-score');
        const movesEl = document.getElementById('match3-moves');
        const targetEl = document.getElementById('match3-target');
        if (levelEl) levelEl.textContent = match3Game.level;
        if (scoreEl) scoreEl.textContent = match3Game.score;
        if (movesEl) movesEl.textContent = match3Game.moves;
        if (targetEl) targetEl.textContent = match3Game.targetScore;
    }

    function match3LevelComplete() {
        let reward = 10;
        if (match3Game.level <= 3) {
            reward = 10 + (match3Game.level - 1) * 10;
        } else if (match3Game.level <= 6) {
            reward = 50 + (match3Game.level - 4) * 10;
        } else {
            reward = 100 + (match3Game.level - 7) * 20;
        }
        
        S.pts += reward;
        upd();
        msg(`恭喜通过第${match3Game.level}关！获得${reward}积分！`);
        
        match3Game.level++;
        match3Game.targetScore = 1000 + (match3Game.level - 1) * 500;
        match3Game.moves = 30 + (match3Game.level - 1) * 5;
        
        setTimeout(() => {
            match3Restart();
        }, 1000);
    }

    // 初始化位置信息（不自动请求，等待用户交互）
    function initLocation() {
        // 检查是否支持地理定位
        if (!navigator.geolocation) {
            S.location.address = '不支持定位';
            updateLocationText();
            return;
        }
        
        // 检查权限状态（如果浏览器支持）
        if (navigator.permissions && navigator.permissions.query) {
            try {
                navigator.permissions.query({name: 'geolocation'}).then(function(result) {
                    if (result.state === 'granted') {
                        // 如果已经授权，自动获取位置
                        getLocation();
                    } else {
                        // 如果还未询问或被拒绝，显示提示让用户点击
                        S.location.address = '点击获取位置';
                        updateLocationText();
                    }
                    
                    // 监听权限状态变化
                    result.onchange = function() {
                        if (result.state === 'granted') {
                            getLocation();
                        }
                    };
                }).catch(function() {
                    // 如果不支持权限查询，显示默认提示
                    S.location.address = '点击获取位置';
                    updateLocationText();
                });
            } catch(e) {
                // 如果权限查询失败，显示默认提示
                S.location.address = '点击获取位置';
                updateLocationText();
            }
        } else {
            // 如果不支持权限查询API，显示默认提示
            S.location.address = '点击获取位置';
            updateLocationText();
        }
    }

    // 获取用户位置
    function getLocation() {
        if (!navigator.geolocation) {
            console.log('浏览器不支持地理定位');
            S.location.address = '不支持定位';
            updateLocationText();
            return;
        }

        // 显示"定位中..."
        S.location.address = '定位中...';
        updateLocationText();

        navigator.geolocation.getCurrentPosition(
            function(position) {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                S.location.lat = lat;
                S.location.lng = lng;
                
                // 使用逆地理编码获取地址
                reverseGeocode(lat, lng);
            },
            function(error) {
                console.log('获取位置失败:', error.message, error.code);
                let errorMsg = '定位失败';
                
                // 根据错误代码提供更具体的提示
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        errorMsg = '请授权位置';
                        // 手机端提供更友好的提示
                        const isMobile = window.innerWidth <= 480;
                        setTimeout(() => {
                            if (isMobile) {
                                msg('请在浏览器设置中允许位置访问权限，然后点击位置信息重试');
                            } else {
                                msg('请在浏览器设置中允许位置访问权限');
                            }
                        }, 500);
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMsg = '位置不可用';
                        break;
                    case error.TIMEOUT:
                        errorMsg = '定位超时';
                        // 超时时可以重试
                        setTimeout(() => {
                            getLocation();
                        }, 2000);
                        break;
                    default:
                        errorMsg = '定位失败';
                        break;
                }
                
                S.location.address = errorMsg;
                updateLocationText();
            },
            {
                enableHighAccuracy: false, // 手机端改为false，提高成功率
                timeout: 20000, // 增加超时时间到20秒，给手机端更多时间
                maximumAge: 300000 // 5分钟内使用缓存位置
            }
        );
    }

    // 逆地理编码：将坐标转换为地址
    function reverseGeocode(lat, lng) {
        // 使用Nominatim API（OpenStreetMap的免费服务）
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1&accept-language=zh-CN`;
        
        fetch(url, {
            headers: {
                'User-Agent': 'AFRICA-Mall-App'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data && data.address) {
                    const addr = data.address;
                    // 构建地址：优先使用区/县，然后是城市
                    let locationText = '';
                    if (addr.city_district) {
                        locationText = addr.city_district;
                    } else if (addr.district) {
                        locationText = addr.district;
                    } else if (addr.city) {
                        locationText = addr.city;
                    } else if (addr.town) {
                        locationText = addr.town;
                    } else if (addr.village) {
                        locationText = addr.village;
                    } else if (addr.county) {
                        locationText = addr.county;
                    } else if (addr.state) {
                        locationText = addr.state;
                    } else {
                        locationText = '当前位置';
                    }
                    
                    // 限制文本长度，移动端显示更短
                    const isMobile = window.innerWidth <= 480;
                    if (isMobile && locationText.length > 4) {
                        locationText = locationText.substring(0, 4);
                    } else if (!isMobile && locationText.length > 6) {
                        locationText = locationText.substring(0, 6);
                    }
                    
                    S.location.address = locationText;
                    updateLocationText();
                } else {
                    // 如果无法获取地址，显示简化的文本
                    S.location.address = '当前位置';
                    updateLocationText();
                }
            })
            .catch(error => {
                console.log('逆地理编码失败:', error);
                // 失败时，如果有坐标则显示"当前位置"，否则不更新
                if (S.location.lat && S.location.lng) {
                    S.location.address = '当前位置';
                    updateLocationText();
                }
                // 如果没有坐标，不更新地址，保持"定位中..."
            });
    }

    // 更新位置显示文本
    function updateLocationText() {
        const locationTextEl = document.getElementById('location-text');
        if (locationTextEl) {
            // 只有在有实际地址时才更新
            if (S.location.address) {
                locationTextEl.textContent = S.location.address;
            } else {
                // 如果没有地址，显示"定位中"
                locationTextEl.textContent = '定位中...';
            }
        }
    }

    // 处理位置信息点击
    function handleLocationClick() {
        const address = S.location.address;
        
        // 如果显示的是提示信息或错误信息，尝试获取位置
        if (address === '点击获取位置' || address === '请授权位置' || address === '定位失败' || address === '位置不可用' || address === '定位超时' || address === '不支持定位' || address === '当前位置' || !address) {
            getLocation();
            return;
        }
        
        // 如果正在定位，不重复请求
        if (address === '定位中...') {
            return;
        }
        
        // 如果有坐标，打开谷歌地图
        if (S.location.lat && S.location.lng) {
            const url = `https://www.google.com/maps?q=${S.location.lat},${S.location.lng}`;
            window.open(url, '_blank');
        } else if (address && address !== '定位中...') {
            // 如果有地址信息，打开谷歌地图搜索该地址
            const encodedAddress = encodeURIComponent(address);
            const url = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
            window.open(url, '_blank');
        } else {
            // 如果正在定位，重新尝试获取
            getLocation();
        }
    }

    // 打开谷歌地图（保留原函数以兼容）
    function openLocationMap() {
        handleLocationClick();
    }

    // 打开充值记录
    function openRechargeHistory() {
        const listEl = document.getElementById('recharge-history-list');
        if (!listEl) return;
        
        if (!S.rec.r || S.rec.r.length === 0) {
            listEl.innerHTML = '<div class="empty-msg">暂无充值记录</div>';
        } else {
            let html = '';
            S.rec.r.forEach((record, idx) => {
                const safeAmount = escapeHtml(record.amount);
                const safeTime = escapeHtml(record.time);
                const safeSource = escapeHtml(record.source);
                html += `<div style="padding:12px; margin-bottom:8px; background:var(--item-bg); border-radius:6px; border:1px solid var(--border-medium);">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                        <div style="font-size:1rem; font-weight:700; color:var(--primary);">¥${safeAmount}</div>
                        <div style="font-size:0.85rem; color:var(--text-gray);">${safeSource}</div>
                    </div>
                    <div style="font-size:0.8rem; color:var(--text-gray);">${safeTime}</div>
                </div>`;
            });
            listEl.innerHTML = html;
        }
        document.getElementById('modal-recharge-history').style.display = 'flex';
    }

    // 打开等级信息
    function openLevelInfo() {
        document.getElementById('modal-level-info').style.display = 'flex';
    }

    // 选择支付方式
    function selectPaymentMethod(method) {
        S.selectedPaymentMethod = method;
        doRech();
    }

    return { init, nav, swt, preRecharge, doRech, selectPaymentMethod, buyOrig, confirmBuyOrig, closeConfirmOrig, draw, closeDraw, fav, exch, confirmExch, closeConfirmExch, subReg, openReg, openCS, subCS, togPt, det, openFavs, togFavLi, actFav, toLucky, showProductInfo, buyProduct, showItemDetail, addRec, handleFileChange, switchGrid, doSearch, renderSearchHistory, clearSearchHistory, delSearchHist, toggleSearchHist, loginGoogle, loginFacebook, loginEmail, loginPhone, submitEmailLogin, submitPhoneLogin, editSecurityText, openWinNoticeModal, closeWinNoticeModal, openAddressEdit, saveAddress, openBreakoutGame, closeBreakoutGame, breakoutRestart, openSpaceShooterGame, closeSpaceShooterGame, spaceShooterRestart, getLocation, openLocationMap, handleLocationClick, openCatDropdown, closeCatDropdown, selectCategoryFromDropdown, toggleCatExpand, openRechargeHistory, openLevelInfo };
})();

// 注册Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
    alignActsContainer();
    alignPtsFoot();
        navigator.serviceWorker.register('./sw.js')
            .then(function(registration) {
                console.log('ServiceWorker注册成功:', registration.scope);
            })
            .catch(function(error) {
                console.log('ServiceWorker注册失败:', error);
            });
    });
}

// Hide splash screen after 1.3 seconds (1s display + 0.3s fade)
window.addEventListener('load', function () {
    // Already handled by CSS animation
});

document.addEventListener('DOMContentLoaded', function() {
    // 对齐按钮容器
    setTimeout(function() {
        alignActsContainer();
        alignPtsFoot();
    }, 100);
    
    // 窗口大小改变时重新对齐
    window.addEventListener('resize', function() {
        const actsContainer = document.querySelector('.lucky-area .acts');
        const ptsFoot = document.querySelector('.pts-foot');
        const page = document.querySelector('.page.active');
        if (page) {
            const pageRect = page.getBoundingClientRect();
            const pageLeft = pageRect.left;
            const pageWidth = Math.min(pageRect.width, 600);
            if (actsContainer) {
                actsContainer.style.left = pageLeft + 'px';
                actsContainer.style.width = pageWidth + 'px';
                actsContainer.style.right = 'auto';
                actsContainer.style.margin = '0';
            }
            if (ptsFoot) {
                ptsFoot.style.left = pageLeft + 'px';
                ptsFoot.style.width = pageWidth + 'px';
                ptsFoot.style.right = 'auto';
                ptsFoot.style.margin = '0';
            }
        }
    });
    // 确保注册页面显示
    var registerPage = document.getElementById('page-register');
    if (registerPage) {
        // 隐藏所有页面
        document.querySelectorAll('.page').forEach(function(page) {
            page.classList.remove('active');
        });
        // 显示注册页面
        registerPage.classList.add('active');
    }
    
    // 初始化应用
    App.init();
    
    // 初始化后再次确保注册页面显示（防止init()中的代码切换了页面）
    setTimeout(function() {
        var regPage = document.getElementById('page-register');
        if (regPage) {
            document.querySelectorAll('.page').forEach(function(page) {
                if (page.id !== 'page-register') {
                    page.classList.remove('active');
                }
            });
            regPage.classList.add('active');
            // 注册页保持显示，不再自动跳转
        }
    }, 10);
});
