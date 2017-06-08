/**
 * Created by pandaking on 16/9/7.
 */

var firstRow; // 起始行数
var listRows; // 列表每页显示行数
var parameter = {}; // 分页跳转时要带的参数
var totalRows; // 总行数
var totalPages; // 分页总页面数
var rollPage = 5;// 分页栏每页显示的页数
var lastSuffix = true; // 最后一页是否显示总页数

var p = 'p'; //分页参数名
var url = ''; //当前链接URL
var nowPage = 1;

// 分页显示定制
var config = {
    header  : '<span class="rows">共 %TOTAL_ROW% 条记录</span>',
    prev    : '<<',
    next    : '>>',
    first   : '1...',
    last    : '...%TOTAL_PAGE%',
    theme   : '%FIRST% %UP_PAGE% %LINK_PAGE% %DOWN_PAGE% %END%'
};

/**
 * 架构函数
 * @param array $totalRows  总的记录数
 * @param array $listRows  每页显示记录数
 * @param array $parameter  分页跳转的参数
 */
PageUtils = function ($nowPage, $totalRows, $listRows, $parameter) {
    /* 基础设置 */
    totalRows = $totalRows; //设置总记录数
    listRows = $listRows;  //设置每页显示行数
    if ($parameter) {
        parameter = $parameter;
    }
    nowPage = $nowPage;
    nowPage = nowPage > 0 ? nowPage : 1;
    firstRow = listRows * (nowPage - 1);
    return PageUtils.prototype;
};

/**
 * 定制分页链接设置
 * @param string $name  设置名称
 * @param string $value 设置值
 */
PageUtils.prototype.setConfig = function ($name, $value) {
    if (config[$name]) {
        config[$name] = $value;
    }
};

PageUtils.prototype.setUrl = function($url) {
    if($url == '/') {
        $url = '';
    }
    /* 生成URL */
    parameter[p] = '__PAGE__';
    url = U($url, parameter);
    return this;
};

/**
 * 生成链接URL
 * @param  integer $page 页码
 * @return string
 */
PageUtils.prototype.url = function ($page) {
    return url.replace('__PAGE__', $page);
};

/**
 * 组装分页链接
 * @return string
 */
PageUtils.prototype.show = function () {
    if (0 == totalRows) return '';
    /* 计算分页信息 */
    totalPages = Math.ceil(totalRows / listRows); //总页数
    if (totalPages && nowPage > totalPages) {
        nowPage = totalPages;
    }
    /* 计算分页临时变量 */
    $now_cool_page = rollPage / 2;
    $now_cool_page_ceil = Math.ceil($now_cool_page);
    lastSuffix && (config.last = totalPages);

    //上一页
    $up_row = nowPage - 1;
    $up_page = $up_row > 0 ? '<li><a class="pager" href="' + PageUtils.prototype.url($up_row) + '">' + config.prev + '</a></li>' : '';

    //下一页
    $down_row = nowPage + 1;
    $down_page = ($down_row <= totalPages) ? '<li><a class="pager" href="' + PageUtils.prototype.url($down_row) + '">' + config.next + '</a></li>' : '';

    //第一页
    $the_first = '';
    if (totalPages > rollPage && (nowPage - $now_cool_page) >= 1) {
        $the_first = '<li><a class="pager" href="' + PageUtils.prototype.url(1) + '">' + config.first + '</a></li>';
    }

    //最后一页
    $the_end = '';
    if (totalPages > rollPage && (nowPage + $now_cool_page) < totalPages) {
        $the_end = '<li><a class="pager" href="' + PageUtils.prototype.url(totalPages) + '">' + config.last + '</a></li>';
    }

    //数字连接
    $link_page = "";
    for ($i = 1; $i <= rollPage; $i++) {
        var $page;
        if ((nowPage - $now_cool_page) <= 0) {
            $page = $i;
        } else if ((nowPage + $now_cool_page - 1) >= totalPages) {
            $page = $totalPages - $rollPage + $i;
        } else {
            $page = nowPage - $now_cool_page_ceil + $i;
        }
        if ($page > 0 && $page != nowPage) {
            if ($page <= totalPages) {
                $link_page += '<li><a class="pager" href="' + PageUtils.prototype.url($page) + '">' + $page + '</a></li>';
            } else {
                break;
            }
        } else {
            if ($page > 0 && totalPages != 1) {
                $link_page += '<li class="active"><a class="pager" href="#">' + $page + '</a></li>';
            }
        }
    }
    //替换分页内容
    $search = ['%HEADER%', '%NOW_PAGE%', '%UP_PAGE%', '%DOWN_PAGE%', '%FIRST%', '%LINK_PAGE%', '%END%', '%TOTAL_ROW%', '%TOTAL_PAGE%'];
    $replace = [config.header, nowPage, $up_page, $down_page, $the_first, $link_page, $the_end, totalRows, totalPages];
    $page_str = config.theme;
    for (var $key in $search) {
        $page_str = $page_str.replace($search[$key], $replace[$key]);
    }
    return "<div><ul class='pagination'>" + $page_str + "</ul></div>";
};
module.exports = PageUtils;